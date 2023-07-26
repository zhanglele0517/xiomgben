import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/record',
    meta: {
      title: '报警中心',
      rotate: -4,
      width: '22%',
      height: '45px',
      background: `${require('@/assets/barImgs/menu_1.png')}`
    },
    children: [
      //   {
      //   path: 'alarmCenter',
      //   name: 'AlarmCenter',
      //   component: () => import('@/views/alarmCenter/index'),
      //   meta: {
      //     title: '报警中心', icon: 'form'
      //   }
      // },
      {
        path: 'flowPath',
        name: 'FlowPath',
        component: () => import('@/views/alarmCenter/flowPath'),
        meta: {
          title: '报警流程管理', icon: 'form'
        }
      }, {
        path: 'information',
        name: 'Information',
        component: () => import('@/views/alarmCenter/information'),
        meta: {
          title: '报警信息总览', icon: 'form'
        }
      }, {
        path: 'record',
        name: 'Record',
        component: () => import('@/views/alarmCenter/record'),
        meta: {
          title: '运行预警记录查询', icon: 'form'
        }
      }, {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/alarmCenter/statistics'),
        meta: {
          title: '报警历史统计与查询', icon: 'form'
        }
      }]
  },

  {
    path: '/equipmentLifeCyclePath',
    component: Layout,
    redirect: '/equipmentLifeCyclePath/device-dynamics',
    meta: {
      title: '设备全生命周期管理',
      width: '22%',
      height: '55px',
      background: `${require('@/assets/barImgs/menu_2.png')}`,
      rotate: -4
    },
    children: [{
      path: 'assessment',
      name: 'Assessment',
      component: () => import('@/views/equipmentLifeCycle/assessment'),
      meta: {
        title: '健康状态评估配置'
      }
    }, {
      path: 'index',
      name: 'index',
      component: () => import('@/views/equipmentLifeCycle/index'),
      meta: {
        title: '设备寿命维护'
      }
    }, {
      path: 'upbe',
      name: 'upbe',
      component: () => import('@/views/equipmentLifeCycle/upbe'),
      meta: {
        title: '系数维护'
      }
    }, {
      path: 'life',
      name: 'life',
      component: () => import('@/views/equipmentLifeCycle/life'),
      meta: {
        title: '设备寿命调整分类维护'
      }
    }, {
      path: 'conversion',
      name: 'conversion',
      component: () => import('@/views/equipmentLifeCycle/conversion'),
      meta: {
        title: '折算系数维护'
      }
    }, {
      path: 'work',
      name: 'work',
      component: () => import('@/views/equipmentLifeCycle/work'),
      meta: {
        title: '工况类型维护'
      }

    },{
      path: 'assess',
      name: 'assess',
      component: () => import('@/views/equipmentLifeCycle/assess'),
      meta: {
        title: '健康状态评估配置-查看详情'
      }
    },
    {
      path: 'accident',
      name: 'accident',
      component: () => import('@/views/equipmentLifeCycle/accident'),
      meta: {
        title: '事故录入管理'
      }
    },
    {
      path: 'dynamic',
      name: 'dynamic',
      component: () => import('@/views/equipmentLifeCycle/dynamic'),
      meta: {
        title: '设备动态管理-维护计划'
      }
    },
    {
      path: 'maintain',
      name: 'maintain',
      component: () => import('@/views/equipmentLifeCycle/maintain'),
      meta: {
        title: '设备动态管理-历史维护'
      }
    },{
      path: 'repair',
      name: 'repair',
      component: () => import('@/views/equipmentLifeCycle/repair'),
      meta: {
        title: '设备动态管理-维修记录'
      }
    },
  ]

    }, {
      path: 'overhaul',
      name: 'Overhaul',
      component: () => import('@/views/equipmentLifeCycle/overhaul'),
      meta: {
        title: '检修定期工作管理'
      }
    }, {
      path: 'configure',
      name: 'Configure',
      component: () => import('@/views/equipmentLifeCycle/configure'),
      meta: {
        title: '检修定期工作管理配置',
        noShow: true
      }
    }, {
      path: 'rules',
      name: 'Rules',
      component: () => import('@/views/equipmentLifeCycle/rules'),
      meta: {
        title: '设备规程信息管理'
      }
    }, {
      path: 'equipment-type',
      name: 'EquipmentType',
      component: () => import('@/views/equipmentLifeCycle/equipment-type'),
      meta: {
        title: '设备类型配置'
      }
    }, {
      path: 'manufactor',
      name: 'Manufactor',
      component: () => import('@/views/equipmentLifeCycle/manufactor'),
      meta: {
        title: '生产厂家配置'
      }
    }, {
      path: 'system',
      name: 'System',
      component: () => import('@/views/equipmentLifeCycle/system'),
      meta: {
        title: '系统配置'
      }
    }, {
      path: 'crew',
      name: 'Crew',
      component: () => import('@/views/equipmentLifeCycle/crew'),
      meta: {
        title: '机组配置'
      }
    }, {
      path: 'device-dynamics',
      name: 'DeviceDynamics',
      component: () => import('@/views/equipmentLifeCycle/device-dynamics'),
      meta: {
        title: '设备动态管理'
      }
    }, {
      path: 'equipment-entry',
      name: 'EquipmentEntry',
      component: () => import('@/views/equipmentLifeCycle/equipment-entry'),
      meta: {
        title: '设备动态管理 > 设备录入',
        noShow: true
      }
    },{
    path: '/operationOptimizationPath',
    component: Layout,
    redirect: '/operationOptimizationPath/iems',
    meta: {
      title: '运行优化管理',
      width: '22%',
      height: '65px',
      background: `${require('@/assets/barImgs/menu_3.png')}`,
      rotate: -5
    },
    children: [{
      path: 'operationOptimization',
      name: 'OperationOptimization',
      component: () => import('@/views/operationOptimization/index'),
      meta: {
        title: '煤种数据库'
      }
    }, {
      path: 'iems',
      name: 'Iems',
      component: () => import('@/views/operationOptimization/iems'),
      meta: {
        title: 'IEMS实时数据'
      }
    }, {
      path: 'linst',
      name: 'linst',
      component: () => import('@/views/operationOptimization/linst'),
      meta: {
        title: '当前煤种信息'
      }
    }, {
      path: 'history',
      name: 'history',
      component: () => import('@/views/operationOptimization/history'),
      meta: {
        title: '煤种历史信息'
      }
    }, {
      path: 'theory',
      name: 'theory',
      component: () => import('@/views/operationOptimization/theory'),
      meta: {
        title: '理论所需比集尘面积配置'
      }
    }]
  },
  {
    path: '/benchmarkingPath',
    component: Layout,
    redirect: '/benchmarkingPath/working-condition',
    meta: {
      title: '对标管理',
      width: '22%',
      // height: '78px',
      // width: '22%',
      height: '72px',
      background: `${require('@/assets/barImgs/menu_4.png')}`,
      rotate: -6
    },
    children: [{
      path: 'target',
      name: 'Target',
      component: () => import('@/views/benchmarking/target'),
      meta: {
        title: '指标对标'
      }
    }, {
      path: 'design-value',
      name: 'DesignValue',
      component: () => import('@/views/benchmarking/design-value'),
      meta: {
        title: '指标对标设计值'
      }
    }, {
      path: 'working-condition',
      name: 'WorkingCondition',
      component: () => import('@/views/benchmarking/working-condition'),
      meta: {
        title: '指标对标工况划分'
      }
    }]
  },
  {
    path: '/flowFieldPath',
    component: Layout,
    redirect: '/flowField',
    meta: {
      title: '流场模拟分析',
      width: '20%',
      rotate: -3,
      height: '54px',
      background: `${require('@/assets/barImgs/menu_5.png')}`
    },
    children: [{
      path: '/flowField',
      name: 'FlowField',
      component: () => import('@/views/flowField/index'),
      meta: { title: '流场模拟分析', icon: 'form' }
    }]
  },
  {
    path: '/cockpitPath',
    component: Layout,
    redirect: '/cockpit', meta: {
      title: '电除尘驾驶舱', width: '20%',
      rotate: -2,
      height: '64px',
      background: `${require('@/assets/barImgs/menu_6.png')}`
    },
    children: [{
      path: '/cockpit',
      name: 'Cockpit',
      component: () => import('@/views/cockpit/index'),
      meta: { title: '电除尘驾驶舱', icon: 'form' }
    }]
  },
  {
    path: '/barImgsPath', meta: {
      title: '三维可视化', width: '20%',
      rotate: 0,
      height: '74px',
      background: `${require('@/assets/barImgs/menu_7.png')}`
    },
    component: Layout,
    redirect: '/threeDimensional',
    children: [{
      path: '/threeDimensional',
      name: 'ThreeDimensional',
      component: () => import('@/views/threeDimensional/index'),
      meta: { title: '三维可视化', icon: 'form' }
    }]
  },
  {
    path: '/savingEffectPath',
    component: Layout, meta: {
      title: '节效分析', width: '20%',
      rotate: 2,
      height: '64px',
      background: `${require('@/assets/barImgs/menu_8.png')}`
    },
    redirect: '/savingEffect',
    children: [{
      path: '/savingEffect',
      name: 'SavingEffect',
      component: () => import('@/views/savingEffect/index'),
      meta: { title: '节效分析', icon: 'form' }
    }]
  },
  {
    path: '/removeDustPath',
    component: Layout,
    redirect: '/removeDust', meta: {
      title: '电除尘大闭环控制', width: '20%',
      rotate: 3,
      height: '54px',
      background: `${require('@/assets/barImgs/menu_9.png')}`
    },
    children: [{
      path: '/removeDust',
      name: 'RemoveDust',
      component: () => import('@/views/removeDust/index'),
      meta: { title: '电除尘大闭环控制', icon: 'form' }
    }]
  },
  {
    path: '/reportFormPath',
    meta: {
      title: '报表管理',
      width: '22%',
      height: '72px',
      rotate: -3,
      background: `${require('@/assets/barImgs/menu_10.png')}`
    },
    component: Layout,
    redirect: '/reportFormPath/remove-dust',
    children: [{
      path: 'remove-dust',
      name: 'RemoveDust',
      component: () => import('@/views/reportForm/remove-dust'),
      meta: { title: '除尘运行报表', icon: 'form' }
    }]
  },
  {
    path: '/systemPath',
    component: Layout,
    redirect: '/system', meta: {
      title: '系统管理',
      width: '22%',
      height: '65px',
      background: `${require('@/assets/barImgs/menu_11.png')}`,
      rotate: -3
    },
    children: [{
      path: '/system',
      name: 'System',
      component: () => import('@/views/system/index'),
      meta: { title: '系统管理', icon: 'form' }
    }]
  },
  {
    path: '/personalCenterPath',
    meta: {
      title: '个人中心',
      width: '22%',
      height: '55px',
      background: `${require('@/assets/barImgs/menu_12.png')}`,
      rotate: -3
    },
    component: Layout,
    redirect: '/personalCenter',
    children: [{
      path: '/personalCenter',
      name: 'PersonalCenter',
      component: () => import('@/views/personalCenter/index'),
      meta: { title: '个人中心', icon: 'form' }
    }]
  },
  {
    path: '/usersPath',
    component: Layout,
    redirect: '/users',
    meta: {
      title: '用户管理',
      width: '22%',
      height: '45px',
      background: `${require('@/assets/barImgs/menu_13.png')}`,
      rotate: 3
    },
    children: [{
      path: '/users',
      name: 'Users',
      component: () => import('@/views/users/index'),
      meta: { title: '用户管理', icon: 'form' }
    }]
  },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
