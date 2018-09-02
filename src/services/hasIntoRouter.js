export const isHasInRouter = ({ router, method, path }) =>
  router.stack.some(
    item => item.path === path && item.methods.includes(method)
  );
