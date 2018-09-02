export const removeRoute = ({ router, method, path }) => {
  const routeIndex = router.stack.findIndex(
    item => item.path === path && item.methods.includes(method)
  );

  return router.stack.splice(routeIndex, 1);
};
