export const isHasInRouter = ({ subdomain, host, method, path }) => {
  // FIXME: very dumb checking logic  add
  const hasSubDomain = subdomain.subs
    .map(sub => sub.includes(host))
    .some(item => item);

  let subs = false;
  if (hasSubDomain) {
    subdomain.middlewares.forEach(mid =>
      mid.router.stack.forEach(route => {
        if (route.methods.includes(method) && route.path === path) {
          subs = true;
        }
      })
    );
  }

  return hasSubDomain && subs;
};
