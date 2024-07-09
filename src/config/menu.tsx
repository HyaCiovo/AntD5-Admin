import { AppstoreOutlined } from '@ant-design/icons';

export const menus = [
  {
    label: "用户管理",
    icon: <AppstoreOutlined />,
    key: "agency_manage",
    children: [
      {
        label: "注册用户",
        link: "/users",
        key: "user_list",
        auth: "users",
      },
      {
        label: "买方认证",
        auth: "buyer_authentication",
        link: "/admin/agency",
        key: "agency_list",
      },
      {
        label: "商家列表",
        auth: "merchant_menu_agency_list",
        link: "/merchant",
        key: "merchants-list",
      },
      {
        label: "弱授权管理",
        auth: "auth_white_list_page",
        link: "/admin/weakAuthManagement",
        key: "weak-auth-management",
      },
    ],
  },
  {
    label: "类目管理",
    icon: <AppstoreOutlined />,
    key: "category",
    children: [
      {
        label: "后台类目",
        link: "/backend/category",
        key: "backendCategory",
        auth: "back_category",
      },
      {
        label: "属性库管理",
        link: "/attributes",
        key: "attribute-manage",
        auth: "attribute-manage",
      },
      {
        label: "前台类目",
        link: "/frontend/category",
        key: "frontendCategory",
        auth: "front_category",
      },
      {
        label: "专区管理",
        auth: "zone_details",
        link: "/prefecture-management",
        key: "prefecture-management",
      },
    ],
  },
  {
    label: "产品管理",
    icon: <AppstoreOutlined />,
    key: "item",
    children: [
      {
        label: "场景管理",
        link: "/compliance-scene",
        key: "compliance-scene",
        auth: "scenario.select",
      },
      {
        label: "产品管理",
        link: "/admin/items",
        key: "item_list",
        auth: "items",
      },
      {
        label: "产品推荐",
        link: "/items/recommend",
        key: "item_recommend",
        auth: "itemRecommend",
      },
    ],
  },
  {
    label: "API调用日志",
    icon: <AppstoreOutlined />,
    key: "api-callLog",
    children: [
      {
        label: "API调用日志",
        key: "allLog-list",
        auth: "api_log_detail",
        link: "/admin/api-callLog",
      },
    ],
  },
  {
    label: "审核管理",
    icon: <AppstoreOutlined />,
    key: "item-approval",
    children: [
      {
        label: "产品交易审核",
        key: "order-approval",
        auth: "item_trade_audit_query_list",
        link: "/order-approval",
      },
      {
        label: "产品审核",
        key: "seller-approval",
        auth: "product_audit",
        link: "/off-shell-approval",
      },
      {
        label: "授权模板审核",
        key: "auth-template-approval",
        auth: "auth_template_audit",
        link: "/auth-template-approval",
      },
      {
        label: "商家入驻审核",
        key: "merchants-approval",
        auth: "shop_authentication_agency_audit_list",
        link: "/merchant-approval",
      },
      {
        label: "买家认证审核",
        key: "agency-approval",
        auth: "buyer_auth_audit_list",
        link: "/agency-approval",
      },
      {
        label: "供需发布审核",
        key: "supply-demand-approval",
        auth: "demand_audit_page",
        link: "/supply-demand-approval",
      },
      {
        label: "合规场景审核",
        key: "compliance-scene-approval",
        auth: "scenario_audit_list",
        link: "/compliance-scene-approval",
      },
    ],
  },
  {
    label: "订单管理",
    icon: <AppstoreOutlined />,
    key: "trade",
    children: [
      {
        label: "订单管理",
        link: "/orders",
        key: "order-manage",
        auth: "trade_list",
      },
      {
        label: "异常支付单",
        link: "/repeat-pay",
        key: "repeat-pay",
        auth: "exception_pay_order_list",
      },
    ],
  },
  {
    label: "交易登记",
    icon: <AppstoreOutlined />,
    key: "contract",
    children: [
      {
        label: "交易登记",
        auth: "contract.list",
        link: "/transaction-registration",
        key: "transaction-registration",
      },
    ],
  },
  {
    label: "财务管理",
    icon: <AppstoreOutlined />,
    key: "financial-manange",
    children: [
      {
        label: "订单明细",
        key: "order-details",
        auth: "financial_order_list",
        link: "/financial/order",
      },
      {
        label: "结算账单",
        key: "settle-bill",
        auth: "financial_month_settle",
        link: "/financial/settle",
      },
    ],
  },
  {
    label: "文章中心",
    icon: <AppstoreOutlined />,
    key: "cms",
    children: [
      {
        label: "文章分类",
        key: "cms-category",
        auth: "articleCategory",
        link: "/article/category",
      },
      {
        label: "文章管理",
        key: "article-category",
        auth: "articleList",
        link: "/article/list",
      },
      {
        label: "报告管理",
        key: "reportManage",
        auth: "reportList",
        link: "/article/report",
      },
    ],
  },
  {
    label: "账号权限",
    icon: <AppstoreOutlined />,
    key: "auth",
    children: [
      {
        label: "角色权限",
        key: "role-management",
        link: "/roles",
        auth: "roles",
      },
      {
        label: "账号管理",
        key: "account-management",
        link: "/accounts",
        auth: "accounts",
      },
    ],
  },
  {
    label: "需求管理",
    icon: <AppstoreOutlined />,
    auth: "demand-list",
    key: "requirements",
    children: [
      {
        label: "需求管理",
        key: "requirements-management",
        link: "/requirements",
      },
    ],
  },
  {
    label: "入驻审核管理",
    key: "settled_setting",
    icon: <AppstoreOutlined />,
    children: [
      {
        label: "审核列表",
        link: "/audit/auditList",
        key: " audit_list",
        auth: "audit_list",
      },
    ],
  },
  {
    label: "系统配置",
    key: "system-setting",
    icon: <AppstoreOutlined />,
    children: [
      {
        label: "轮播图设置",
        auth: "banner_manage",
        key: "banner-setting",
        link: "/banner-setting",
      },
      {
        label: "合作伙伴配置",
        auth: "partner.page",
        key: "partner",
        link: "/partner-setting",
      },
      {
        label: "服务机构配置",
        auth: "agency_manager.view",
        key: "server",
        link: "/service-organization",
      },
      {
        label: "系统日志",
        auth: "system_log",
        key: "/system-operation-log",
        link: "/system-operation-log",
      },
    ],
  },
  {
    label: "合规管理",
    icon: <AppstoreOutlined />,
    key: "compliance-management",
    children: [
      {
        label: "问卷披露",
        key: "questionnaire-disclosure",
        auth: "compliance_questionnaire",
        link: "/questionnaire-disclosure",
      },
    ],
  },
];
