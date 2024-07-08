import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    id: 2,
    label: "DASHBOARDS",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 1,
        label: "Accueil",
        link: "/dashboards/jobs",
        parentId: 2,
      },
    ],
  },

  // {
  //   id: 8,
  //   isLayout: true,
  // },
  // {
  //   id: 9,
  //   label: "MENUITEMS.APPS.TEXT",
  //   isTitle: true,
  // },
  // {
  //   id: 10,
  //   label: "MENUITEMS.CALENDAR.TEXT",
  //   icon: "bx-calendar",
  //   link: "/calendar",
  // },
  // {
  //   id: 11,
  //   label: "MENUITEMS.CHAT.TEXT",
  //   icon: "bx-chat",
  //   link: "/chat",
  // },
  // {
  //   id: 12,
  //   label: "MENUITEMS.FILEMANAGER.TEXT",
  //   icon: "bx-file",
  //   link: "/filemanager",
  // },
  // {
  //   id: 13,
  //   label: "MENUITEMS.ECOMMERCE.TEXT",
  //   icon: "bx-store",
  //   subItems: [
  //     {
  //       id: 14,
  //       label: "MENUITEMS.ECOMMERCE.LIST.PRODUCTS",
  //       link: "/ecommerce/products",
  //       parentId: 13,
  //     },
  //     {
  //       id: 15,
  //       label: "MENUITEMS.ECOMMERCE.LIST.PRODUCTDETAIL",
  //       link: "/ecommerce/product-detail/1",
  //       parentId: 13,
  //     },
  //     {
  //       id: 16,
  //       label: "MENUITEMS.ECOMMERCE.LIST.ORDERS",
  //       link: "/ecommerce/orders",
  //       parentId: 13,
  //     },
  //     {
  //       id: 17,
  //       label: "MENUITEMS.ECOMMERCE.LIST.CUSTOMERS",
  //       link: "/ecommerce/customers",
  //       parentId: 13,
  //     },
  //     {
  //       id: 18,
  //       label: "MENUITEMS.ECOMMERCE.LIST.CART",
  //       link: "/ecommerce/cart",
  //       parentId: 13,
  //     },
  //     {
  //       id: 19,
  //       label: "MENUITEMS.ECOMMERCE.LIST.CHECKOUT",
  //       link: "/ecommerce/checkout",
  //       parentId: 13,
  //     },
  //     {
  //       id: 20,
  //       label: "MENUITEMS.ECOMMERCE.LIST.SHOPS",
  //       link: "/ecommerce/shops",
  //       parentId: 13,
  //     },
  //     {
  //       id: 21,
  //       label: "MENUITEMS.ECOMMERCE.LIST.ADDPRODUCT",
  //       link: "/ecommerce/add-product",
  //       parentId: 13,
  //     },
  //   ],
  // },
  // {
  //   id: 22,
  //   label: "MENUITEMS.CRYPTO.TEXT",
  //   icon: "bx-bitcoin",
  //   subItems: [
  //     {
  //       id: 23,
  //       label: "MENUITEMS.CRYPTO.LIST.WALLET",
  //       link: "/crypto/wallet",
  //       parentId: 22,
  //     },
  //     {
  //       id: 24,
  //       label: "MENUITEMS.CRYPTO.LIST.BUY/SELL",
  //       link: "/crypto/buy-sell",
  //       parentId: 22,
  //     },
  //     {
  //       id: 25,
  //       label: "MENUITEMS.CRYPTO.LIST.EXCHANGE",
  //       link: "/crypto/exchange",
  //       parentId: 22,
  //     },
  //     {
  //       id: 26,
  //       label: "MENUITEMS.CRYPTO.LIST.LENDING",
  //       link: "/crypto/lending",
  //       parentId: 22,
  //     },
  //     {
  //       id: 27,
  //       label: "MENUITEMS.CRYPTO.LIST.ORDERS",
  //       link: "/crypto/orders",
  //       parentId: 22,
  //     },
  //     {
  //       id: 28,
  //       label: "MENUITEMS.CRYPTO.LIST.KYCAPPLICATION",
  //       link: "/crypto/kyc-application",
  //       parentId: 22,
  //     },
  //     {
  //       id: 29,
  //       label: "MENUITEMS.CRYPTO.LIST.ICOLANDING",
  //       link: "/crypto-ico-landing",
  //       parentId: 22,
  //     },
  //   ],
  // },
  // {
  //   id: 30,
  //   label: "MENUITEMS.EMAIL.TEXT",
  //   icon: "bx-envelope",
  //   subItems: [
  //     {
  //       id: 31,
  //       label: "MENUITEMS.EMAIL.LIST.INBOX",
  //       link: "/email/inbox",
  //       parentId: 30,
  //     },
  //     {
  //       id: 32,
  //       label: "MENUITEMS.EMAIL.LIST.READEMAIL",
  //       link: "/email/read/1",
  //       parentId: 30,
  //     },
  //     {
  //       id: 33,
  //       label: "MENUITEMS.EMAIL.LIST.TEMPLATE.TEXT",
  //       badge: {
  //         variant: "success",
  //         text: "MENUITEMS.EMAIL.LIST.TEMPLATE.BADGE",
  //       },
  //       parentId: 30,
  //       subItems: [
  //         {
  //           id: 34,
  //           label: "MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.BASIC",
  //           link: "/email/basic",
  //           parentId: 30,
  //         },
  //         {
  //           id: 35,
  //           label: "MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.ALERT",
  //           link: "/email/alert",
  //           parentId: 30,
  //         },
  //         {
  //           id: 36,
  //           label: "MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.BILLING",
  //           link: "/email/billing",
  //           parentId: 30,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 37,
  //   label: "MENUITEMS.INVOICES.TEXT",
  //   icon: "bx-receipt",
  //   subItems: [
  //     {
  //       id: 38,
  //       label: "MENUITEMS.INVOICES.LIST.INVOICELIST",
  //       link: "/invoices/list",
  //       parentId: 37,
  //     },
  //     {
  //       id: 39,
  //       label: "MENUITEMS.INVOICES.LIST.INVOICEDETAIL",
  //       link: "/invoices/detail",
  //       parentId: 37,
  //     },
  //   ],
  // },

  {
    id: 40,
    label: "PROJECTS",
    icon: "bx-briefcase-alt-2",
    subItems: [
      {
        id: 42,
        label: "MENUITEMS.PROJECTS.LIST.PROJECTLIST",
        link: "/projects/list",
        parentId: 40,
      },
      // {
      //   id: 43,
      //   label: "MENUITEMS.PROJECTS.LIST.OVERVIEW",
      //   link: "/projects/overview",
      //   parentId: 40,
      // },
      {
        id: 44,
        label: "MENUITEMS.PROJECTS.LIST.CREATE",
        link: "/projects/create",
        parentId: 40,
      },
      {
        id: 45,
        label: "UPDATE",
        link: "/projects/update",
        parentId: 40,
      },
    ],
  },

  {
    id: 45,
    label: "TACHES",
    icon: "bx-task",
    subItems: [
      {
        id: 46,
        label: "Liste des taches",
        link: "/tasks/list",
        parentId: 45,
      },
      {
        id: 47,
        label: "MENUITEMS.TASKS.LIST.KANBAN",
        link: "/tasks/kanban",
        parentId: 45,
      },
      {
        id: 48,
        label: "Créer",
        link: "/tasks/create",
        parentId: 45,
      },
    ],
  },

  // {
  //   id: 49,
  //   label: "Utilisateurs",
  //   icon: "bxs-user-detail",
  //   subItems: [
  //     {
  //       id: 50,
  //       label: "MENUITEMS.CONTACTS.LIST.USERGRID",
  //       link: "/contacts/grid",
  //       parentId: 49,
  //     },
  //     {
  //       id: 51,
  //       label: "MENUITEMS.CONTACTS.LIST.USERLIST",
  //       link: "/contacts/list",
  //       parentId: 49,
  //     },
  //     {
  //       id: 52,
  //       label: "MENUITEMS.CONTACTS.LIST.PROFILE",
  //       link: "/contacts/profile",
  //       parentId: 49,
  //     },
  //   ],
  // },

  // {
  //   id: 53,
  //   label: "MENUITEMS.BLOG.TEXT",
  //   icon: "bx-file",
  //   subItems: [
  //     {
  //       id: 54,
  //       label: "MENUITEMS.BLOG.LIST.BLOGLIST",
  //       link: "/blog/list",
  //       parentId: 53,
  //     },
  //     {
  //       id: 55,
  //       label: "MENUITEMS.BLOG.LIST.BLOGGRID",
  //       link: "/blog/grid",
  //       parentId: 53,
  //     },
  //     {
  //       id: 56,
  //       label: "MENUITEMS.BLOG.LIST.DETAIL",
  //       link: "/blog/detail",
  //       parentId: 53,
  //     },
  //   ],
  // },
  // {
  //   id: 57,
  //   label: "MENUITEMS.JOBS.TEXT",
  //   icon: "bx-briefcase-alt",
  //   subItems: [
  //     {
  //       id: 58,
  //       label: "MENUITEMS.JOBS.LIST.JOBLIST",
  //       link: "/jobs/list",
  //       parentId: 57,
  //     },
  //     {
  //       id: 59,
  //       label: "MENUITEMS.JOBS.LIST.JOBGRID",
  //       link: "/jobs/grid",
  //       parentId: 57,
  //     },
  //     {
  //       id: 60,
  //       label: "MENUITEMS.JOBS.LIST.APPLYJOB",
  //       link: "/jobs/apply",
  //       parentId: 57,
  //     },
  //     {
  //       id: 61,
  //       label: "MENUITEMS.JOBS.LIST.JOBDETAILS",
  //       link: "/jobs/details",
  //       parentId: 57,
  //     },
  //     {
  //       id: 62,
  //       label: "MENUITEMS.JOBS.LIST.JOBCATEGORIES",
  //       link: "/jobs/categories",
  //       parentId: 57,
  //     },
  //     {
  //       id: 63,
  //       label: "MENUITEMS.JOBS.LIST.CANDIDATE.TEXT",
  //       badge: {
  //         variant: "success",
  //         text: "MENUITEMS.EMAIL.LIST.TEMPLATE.BADGE",
  //       },
  //       parentId: 57,
  //       subItems: [
  //         {
  //           id: 64,
  //           label: "MENUITEMS.JOBS.LIST.CANDIDATE.LIST.LIST",
  //           link: "/jobs/candidate-list",
  //           parentId: 57,
  //         },
  //         {
  //           id: 65,
  //           label: "MENUITEMS.JOBS.LIST.CANDIDATE.LIST.OVERVIEW",
  //           link: "/jobs/candidate-overview",
  //           parentId: 57,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 66,
  //   label: "MENUITEMS.PAGES.TEXT",
  //   isTitle: true,
  // },
  // {
  //   id: 67,
  //   label: "MENUITEMS.AUTHENTICATION.TEXT",
  //   icon: "bx-user-circle",
  //   subItems: [
  //     {
  //       id: 68,
  //       label: "MENUITEMS.AUTHENTICATION.LIST.LOGIN",
  //       link: "/auth/login",
  //       parentId: 67,
  //     },
  //     {
  //       id: 69,
  //       label: "MENUITEMS.AUTHENTICATION.LIST.LOGIN2",
  //       link: "/auth/login-2",
  //       parentId: 67,
  //     },
  //     {
  //       id: 70,
  //       label: "MENUITEMS.AUTHENTICATION.LIST.REGISTER",
  //       link: "/auth/signup",
  //       parentId: 67,
  //     },
  //     {
  //       id: 71,
  //       label: "MENUITEMS.AUTHENTICATION.LIST.REGISTER2",
  //       link: "/auth/signup-2",
  //       parentId: 67,
  //     },
  //     {
  //       id: 72,
  //       label: "MENUITEMS.AUTHENTICATION.LIST.RECOVERPWD",
  //       link: "/auth/reset-password",
  //       parentId: 67,
  //     },
  //     {
  //       id: 73,
  //       label: "MENUITEMS.AUTHENTICATION.LIST.RECOVERPWD2",
  //       link: "/auth/recoverpwd-2",
  //       parentId: 67,
  //     },
  //     {
  //       id: 74,
  //       label: "MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN",
  //       link: "/pages/lock-screen-1",
  //       parentId: 67,
  //     },
  //     {
  //       id: 75,
  //       label: "MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN2",
  //       link: "/pages/lock-screen-2",
  //       parentId: 67,
  //     },
  //     {
  //       id: 76,
  //       label: "MENUITEMS.AUTHENTICATION.LIST.CONFIRMMAIL",
  //       link: "/pages/confirm-mail",
  //       parentId: 67,
  //     },
  //     {
  //       id: 77,
  //       label: "MENUITEMS.AUTHENTICATION.LIST.CONFIRMMAIL2",
  //       link: "/pages/confirm-mail-2",
  //       parentId: 67,
  //     },
  //     {
  //       id: 78,
  //       label: "MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION",
  //       link: "/pages/email-verification",
  //       parentId: 67,
  //     },
  //     {
  //       id: 79,
  //       label: "MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION2",
  //       link: "/pages/email-verification-2",
  //       parentId: 67,
  //     },
  //     {
  //       id: 80,
  //       label: "MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION",
  //       link: "/pages/two-step-verification",
  //       parentId: 67,
  //     },
  //     {
  //       id: 81,
  //       label: "MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION2",
  //       link: "/pages/two-step-verification-2",
  //       parentId: 67,
  //     },
  //   ],
  // },
  // {
  //   id: 82,
  //   label: "MENUITEMS.UTILITY.TEXT",
  //   icon: "bx-file",
  //   subItems: [
  //     {
  //       id: 83,
  //       label: "MENUITEMS.UTILITY.LIST.STARTER",
  //       link: "/pages/starter",
  //       parentId: 82,
  //     },
  //     {
  //       id: 84,
  //       label: "MENUITEMS.UTILITY.LIST.MAINTENANCE",
  //       link: "/pages/maintenance",
  //       parentId: 82,
  //     },
  //     {
  //       id: 85,
  //       label: "Coming Soon",
  //       link: "/pages/coming-soon",
  //       parentId: 82,
  //     },
  //     {
  //       id: 86,
  //       label: "MENUITEMS.UTILITY.LIST.TIMELINE",
  //       link: "/pages/timeline",
  //       parentId: 82,
  //     },
  //     {
  //       id: 87,
  //       label: "MENUITEMS.UTILITY.LIST.FAQS",
  //       link: "/pages/faqs",
  //       parentId: 82,
  //     },
  //     {
  //       id: 88,
  //       label: "MENUITEMS.UTILITY.LIST.PRICING",
  //       link: "/pages/pricing",
  //       parentId: 82,
  //     },
  //     {
  //       id: 89,
  //       label: "MENUITEMS.UTILITY.LIST.ERROR404",
  //       link: "/pages/404",
  //       parentId: 82,
  //     },
  //     {
  //       id: 90,
  //       label: "MENUITEMS.UTILITY.LIST.ERROR500",
  //       link: "/pages/500",
  //       parentId: 82,
  //     },
  //   ],
  // },

  {
    id: 91,
    label: "MAITRES D'OUVRAGES",
    icon: "bxs-user-detail",
    subItems: [
      // {
      //   id: 92,
      //   label: "MO GRID",
      //   link: "/maitrouvrages/grid",
      //   parentId: 91,
      // },
      {
        id: 93,
        label: "MO LIST",
        link: "/maitrouvrages/list",
        parentId: 91,
      },
      // {
      //   id: 94,
      //   label: "MO PROFILE",
      //   link: "/maitrouvrages/profile",
      //   parentId: 91,
      // },
    ],
  },
  {
    id: 92,
    label: "Parties affectées",
    icon: "bxs-user-detail",
    subItems: [

      {
        id: 95,
        label: "LIST",
        link: "/pap/list",
        parentId: 92,
      },
      {
        id: 96,
        label: "add",
        link: "/pap/add",
        parentId: 92,
      },
    ],
  },
];
