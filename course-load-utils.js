(function (global) {
  const DETAIL_FIELDS = [
    'description',
    'objectives',
    'outcomes',
    'what_you_learn',
    'learn_content',
    'course_method',
    'delivery_method',
    'target_audience',
    'requirements'
  ];

  function courseContentScore(row) {
    if (!row) return 0;
    return DETAIL_FIELDS.reduce((sum, key) => sum + String(row[key] || '').trim().length, 0);
  }

  function dedupeCoursesByName(rows) {
    const byName = new Map();

    (rows || []).forEach(row => {
      const name = String(row.name || '').trim();
      if (!name) return;

      const existing = byName.get(name);
      if (!existing) {
        byName.set(name, row);
        return;
      }

      const existingScore = courseContentScore(existing);
      const rowScore = courseContentScore(row);
      const existingTime = new Date(existing.created_at || 0).getTime();
      const rowTime = new Date(row.created_at || 0).getTime();

      if (rowScore > existingScore || (rowScore === existingScore && rowTime > existingTime)) {
        byName.set(name, row);
      }
    });

    return Array.from(byName.values()).sort(
      (a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0)
    );
  }

  global.InexcCourseLoad = {
    courseContentScore,
    dedupeCoursesByName
  };
})(typeof window !== 'undefined' ? window : globalThis);
