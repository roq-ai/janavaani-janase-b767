const mapping: Record<string, string> = {
  constituencies: 'constituency',
  issues: 'issue',
  'jana-senas': 'jana_sena',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
