import {
  createRootRoute, // for root comp with outllett
  createRoute, // for each route
  createRouter, // needed too , reed next comments
  redirect, // obvious
} from "@tanstack/react-router";

import App from "./App";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/CartPage";
import ChatPage from "./pages/ChatPage";

//firstly we have to create a "createRootRoute" with component that have <Outlet/>

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/home" });
  },
});

// then we can create routes to our components

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: HomePage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id", // $id - dynamic param
  component: ProductPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});

const chatPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat",
  component: ChatPage,
});

// then we need a "route tree"

const routeTree = rootRoute.addChildren([
  homeRoute,
  cartRoute,
  notFoundRoute,
  productRoute,
  loginRoute,
  indexRoute,
  chatPage,
]);

// then create router
export const router = createRouter({ routeTree });

// for TS , auto complite , checking existing path.
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
