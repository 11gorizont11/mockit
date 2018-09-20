export const removeRoute = ({ subdomain, host, method, path }) => {
  const subDomainIndex = subdomain.subs.findIndex(sub => sub.includes(host));
  if (subDomainIndex !== -1) {
    subdomain.subs.splice(subDomainIndex, 1);
  }

  subdomain.middlewares.forEach(mid => {
    const routeIdx = mid.router.stack.findIndex(
      route => route.methods.includes(method) && route.path === path
    );
    if (routeIdx !== -1) {
      mid.router.stack.splice(routeIdx, 1);
    }
  });
};
