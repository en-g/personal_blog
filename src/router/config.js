export const routesRule = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@views/login/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(
        /* webpackChunkName: "main" */ '@components/content/Main/Main.vue'
      ),
    children: [
      {
        path: '',
        redirect: 'index'
      },
      {
        path: 'index',
        name: 'index',
        component: () =>
          import(/* webpackChunkName: "index" */ '@views/index/Index.vue')
      },
      {
        path: 'tags',
        name: 'tags',
        component: () =>
          import(/* webpackChunkName: "tags" */ '@views/tags/Tags.vue')
      },
      {
        path: 'categories',
        name: 'categories',
        component: () =>
          import(
            /* webpackChunkName: "categories" */ '@views/categories/Categories.vue'
          )
      },
      {
        path: 'archives',
        name: 'archives',
        component: () =>
          import(
            /* webpackChunkName: "archives" */ '@views/archives/Archives.vue'
          )
      },
      {
        path: 'friends',
        name: 'friends',
        component: () =>
          import(/* webpackChunkName: "friends" */ '@views/friends/Friends.vue')
      },
      {
        path: 'detail/:blogId',
        name: 'detail',
        component: () =>
          import(/* webpackChunkName: "detail" */ '@views/detail/Detail.vue')
      }
    ]
  }
]
