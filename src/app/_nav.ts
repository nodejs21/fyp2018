export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: any;
  title?: boolean;
  children?: any;
  variant?: string;
  attributes?: object;
  divider?: boolean;
  class?: string;
}

const academyAdminPrefix = '/academyadmin';
const teacherPrefix = '/teacher';
const studentPrefix = '/student';

const academyadmin: NavData[] = [
  {
    title: true,
    name: 'Academy Admin'
  },
  {
    name: 'Dashboard',
    url: `${academyAdminPrefix}`,
    icon: 'icon-speedometer'
    // badge: {
    //   variant: 'danger',
    //   text: 'NEW'
    // },
    // attributes: { disabled: true }
  },
  {
    name: 'Subjects',
    url: `${academyAdminPrefix}/subjects`,
    icon: 'icon-notebook'
  },
  {
    name: 'Classrooms',
    url: `${academyAdminPrefix}/classrooms`,
    icon: 'icon-badge'
  },
  {
    name: 'Teachers',
    url: `${academyAdminPrefix}/teachers`,
    icon: 'icon-user'
  },
  {
    name: 'Students',
    url: `${academyAdminPrefix}/students`,
    icon: 'icon-people'
  },

  {
    name: 'Requests',
    // url: '/theme/typography',
    icon: 'icon-question',
    children: [
      {
        name: 'Students',
        url: `${academyAdminPrefix}/requests/student`,
        icon: 'icon-people'
      },
      {
        name: 'Teachers',
        url: `${academyAdminPrefix}/requests/teacher`,
        icon: 'icon-user'
      }
    ]
  }

  // {
  //   name: 'Time Table',
  //   url: '',
  //   icon: 'icon-calendar'
  // }
];

const teacher: NavData[] = [
  {
    title: true,
    name: 'Teacher'
  },
  {
    name: 'Dashboard',
    url: `${teacherPrefix}`,
    icon: 'icon-speedometer'
  },
  {
    name: 'Classrooms',
    url: `${teacherPrefix}/classrooms`,
    icon: 'icon-screen-desktop'
  },
  {
    name: 'Assignments',
    url: `${teacherPrefix}/course/assignments`,
    icon: 'icon-note'
  },
  {
    name: 'Create Assignment',
    url: `${teacherPrefix}/createassignment`,
    icon: 'icon-pencil'
  },
  {
    name: 'Quizzes',
    url: `${teacherPrefix}/course/quizzes`,
    icon: 'icon-clock'
  },
  {
    name: 'Create Quiz',
    url: `${teacherPrefix}/makequiz`,
    icon: 'icon-settings'
  },

  // {
  //   name: 'Results',
  //   url: `${teacherPrefix}/course/result`,
  //   icon: 'icon-puzzle'
  // },
  {
    name: 'Requests',
    url: `${teacherPrefix}`,
    icon: 'icon-question',
    children: [
      // {
      //   name: 'Invitations',
      //   url: `${teacherPrefix}/requests/invitations`,
      //   icon: 'icon-user'
      // },
      {
        name: 'Sent',
        url: `${teacherPrefix}/requests/sent`,
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Live Class',
    url: `${teacherPrefix}/liveclass`,
    icon: 'icon-earphones-alt'
  }
  // {
  //   name: 'Time Table',
  //   url: `/theme/typography`,
  //   icon: 'icon-pencil'
  // },
];

const student: NavData[] = [
  {
    title: true,
    name: 'Student'
  },
  {
    name: 'Dashboard',
    url: `${studentPrefix}/dashboard`,
    icon: 'icon-speedometer'
  },
  {
    name: 'Classrooms',
    url: `${studentPrefix}/classrooms`,
    icon: 'icon-badge'
  },
  {
    name: 'Assignments',
    url: `${studentPrefix}/assignments`,
    icon: 'icon-note'
  },
  {
    name: 'Quizzes',
    url: `${studentPrefix}/quizzes`,
    icon: 'icon-clock'
  },
  // {
  //   name: 'Attemp Quiz',
  //   url: `${studentPrefix}/attemptquiz`,
  //   icon: 'icon-pencil'
  // },
  // {
  //   name: 'Results',
  //   url: `${studentPrefix}/results`,
  //   icon: 'icon-pencil'
  // },
  {
    name: 'Attendance',
    url: `${studentPrefix}/attendance`,
    icon: 'icon-calendar'
  },
  {
    name: 'Requests',
    url: `${studentPrefix}`,
    icon: 'icon-question',
    children: [
      {
        name: 'Sent',
        url: `${studentPrefix}/requests/sent`,
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Live Class',
    url: `${studentPrefix}/liveclass`,
    icon: 'icon-earphones'
  }
  // {
  //   name: 'Time Table',
  //   url: `/theme/typography`,
  //   icon: 'icon-pencil'
  // },
];

// ************************************commented- original code************************************
// ************************************commented- original code************************************
// ************************************commented- original code************************************
// ************************************commented- original code************************************

export const originalNav: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'danger',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Academy Options'
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    icon: 'icon-drop'
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Assignments',
        url: '/base/assignments',
        icon: 'icon-doc'
      },
      {
        name: 'Quizzes',
        icon: 'icon-note',
        children: [
          {
            name: 'View Quizzes',
            url: '/base/quizzes',
            icon: 'icon-eyeglass'
          },
          {
            name: 'Create Quiz',
            url: '/base/createquiz',
            icon: 'icon-pencil'
          }
        ]
      },
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Pagination',
        url: '/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Brand Buttons',
        url: '/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'CoreUI Icons',
        url: '/icons/coreui-icons',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Flags',
        url: '/icons/flags',
        icon: 'icon-star'
      },
      {
        name: 'Font Awesome',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true }
  }
  // {
  //   name: 'Download CoreUI',
  //   url: 'http://coreui.io/angular/',
  //   icon: 'icon-cloud-download',
  //   class: 'mt-auto',
  //   variant: 'success',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'http://coreui.io/pro/angular/',
  //   icon: 'icon-layers',
  //   variant: 'danger',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // }
];

export const navItems = {
  academyadmin,
  student,
  teacher,
  originalNav
};
