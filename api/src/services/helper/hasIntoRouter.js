export const isHasInRouter = ({ subdomain, host, router, method, path }) => {
  let hasSub;
  if (subdomain.subs.length) {
    hasSub = subdomain.subs.map(sub => sub.includes(host)).some(item => item);
  }
  return (
    hasSub &&
    router.stack.some(
      item => item.path === path && item.methods.includes(method)
    )
  );
};
