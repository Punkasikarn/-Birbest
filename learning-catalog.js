(function (root) {
  'use strict';

  function createBirbestLearningCatalog(data, additions = {}) {
    data = {...data, species:{...data.species, ...additions}};
    const own = (object, key) => Object.hasOwn(object, key) ? object[key] : null;
    const freeze = value => {
      if (value && typeof value === 'object' && !Object.isFrozen(value)) {
        Object.values(value).forEach(freeze);
        Object.freeze(value);
      }
      return value;
    };
    freeze(data);
    const getSpecies = id => own(data.species, id);

    function getLesson(speciesId, lessonId) {
      const species = getSpecies(speciesId);
      if (!species || species.status !== 'available-draft') return null;
      const entry = own(species.lessons, lessonId);
      const definition = own(data.lessons, lessonId);
      if (!entry || entry.status !== 'available-draft' || !definition) return null;
      // Availability is an explicit species/lesson decision, never a shared-content fallback.
      const parts = entry.parts || definition.parts;
      const content = parts.map(part => {
        const block = part.shared
          ? own(data.sharedBlocks, part.shared)
          : own(entry.blocks, part.specific);
        if (!block) throw new Error(`Missing learning block: ${speciesId}/${lessonId}`);
        return block;
      });
      const hasShared = parts.some(part => part.shared);
      const hasSpecific = parts.some(part => part.specific);
      const sources = entry.sourceOverrides
        ? Object.assign(Array.isArray(definition.sources) ? [...definition.sources] : {...definition.sources}, entry.sourceOverrides)
        : definition.sources;
      return freeze({
        ...definition, ...entry.presentation,
        href: lessonId, speciesId, content, parts, sources,
        notes: entry.notes || [],
        reviewReferences: entry.reviewReferences || [],
        review: entry.review,
        reuse: hasShared ? (hasSpecific ? 'mixed' : 'shared') : 'species',
        ...(definition.format === 'sections' ? {sections: content} : {}),
        ...(definition.format === 'questions' ? {questions: content} : {})
      });
    }

    function getCurriculum(speciesId) {
      const species = getSpecies(speciesId);
      if (!species || species.status !== 'available-draft') return null;
      return freeze(species.groups.map(group => ({
        id: group.id, name: group.name,
        lessons: group.lessonIds.map(id => {
          const lesson = getLesson(speciesId, id);
          if (!lesson) throw new Error(`Unavailable lesson in curriculum: ${speciesId}/${id}`);
          return lesson;
        })
      })));
    }

    function lessonHtml(speciesId, lessonId) {
      const lesson = getLesson(speciesId, lessonId);
      if (!lesson || lesson.format !== 'html') return '';
      const learnRoot = `#/learn/${encodeURIComponent(speciesId)}`;
      return lesson.content.join('').replaceAll('{{learnRoot}}', learnRoot);
    }

    // Fail early for broken references; unpublished species need not have a curriculum yet.
    Object.keys(data.species).forEach(getCurriculum);
    const getAvailableSpecies = () => Object.keys(data.species).filter(id => data.species[id].status === 'available-draft');
    return Object.freeze({getSpecies, getLesson, getCurriculum, lessonHtml, getAvailableSpecies});
  }

  if (typeof module === 'object' && module.exports) module.exports = createBirbestLearningCatalog;
  else root.createBirbestLearningCatalog = createBirbestLearningCatalog;
})(globalThis);
