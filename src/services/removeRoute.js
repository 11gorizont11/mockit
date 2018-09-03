export const removeRoute = ({ subdomain, host, router, method, path }) => {
  const subDomainIndex = subdomain.subs.findIndex(sub => sub.includes(host));
  const routeIndex = router.stack.findIndex(
    item => item.path === path && item.methods.includes(method)
  );
  subdomain.subs.splice(subDomainIndex, 1);
  router.stack.splice(routeIndex, 1);
};
