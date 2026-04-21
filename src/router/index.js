const { createRouter, createWebHashHistory } = VueRouter

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: ComingSoon,
      meta: { title: 'Coming soon' }
    }
  ]
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Amorgos Lustrum 2027'
})
