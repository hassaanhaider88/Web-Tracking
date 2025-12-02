function getUniqueUsers(visits) {
  const map = new Map();

  for (const visit of visits) {
    const id = visit.uniqueUserId || visit.ip || visit.ua; // fallback for old data

    if (!map.has(id)) {
      map.set(id, {
        userId: id,
        count: 1,
        visits: [visit] // store all visit records
      });
    } else {
      const existing = map.get(id);
      existing.count += 1;
      existing.visits.push(visit);
    }
  }

  return Array.from(map.values());
}

export default getUniqueUsers;
