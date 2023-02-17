const routes = [

  { path: "/", name: "home", component: () => import("pages/Index.vue") },
  { path: "/knights", name: "knights", component: () => import("pages/KnightsPage") },
  { path: "*", component: () => import("pages/Error404.vue") }

];

export default routes;
