import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    '240df96d538e408ac0cfe6d50a522fc4': {
                        table: 'sp_row'
                        id: '240df96d538e408ac0cfe6d50a522fc4'
                    }
                    '3fdd7a9f4cafa2c112b58f73f372f505': {
                        table: 'sp_widget'
                        id: '3fdd7a9f4cafa2c112b58f73f372f505'
                    }
                    '56b5ccb2c53c76bdcf842b00f2f907a0': {
                        table: 'sp_instance'
                        id: '56b5ccb2c53c76bdcf842b00f2f907a0'
                    }
                    '71c3d7fc8c16c8d130d52609c2cf1069': {
                        table: 'sp_column'
                        id: '71c3d7fc8c16c8d130d52609c2cf1069'
                    }
                    '7fb1ce85c945588fa30b40f3116a49a0': {
                        table: 'sp_portal'
                        id: '7fb1ce85c945588fa30b40f3116a49a0'
                    }
                    bbae84bb22f25b385556415756ee211a: {
                        table: 'sp_container'
                        id: 'bbae84bb22f25b385556415756ee211a'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '43c341e16961400682cfd422e8b34b76'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'f99566c876fc4f8f9c23dae3df32fc3e'
                    }
                }
                composite: [
                    {
                        table: 'sp_page'
                        id: '17e4c760dd49ff080ee95710a05bafbd'
                        key: {
                            id: 'iplegal_home'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '7236ba6bb07544f99764dbd07fd539e7'
                        key: {
                            name: 'x_1939459_iplegal_https'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '789782a6552a4a0490466cb7aca36c05'
                        key: {
                            name: 'x_1939459_iplegal.user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d7ba4e3baaa4e1fba0df18f843721a5'
                        key: {
                            name: 'x_1939459_iplegal_https'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a24b591944e2408ea2a12710e9cf7ae9'
                        key: {
                            name: 'x_1939459_iplegal_https'
                            element: 'www_figma_com_make_uksn7hqnzimvkydc7zoyv6_web_design_system_for_ip_legal_t_5yv1cy4d1ajkrsxe_1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c2317c71e5d24434a44595cee7da7712'
                        key: {
                            name: 'x_1939459_iplegal_https'
                            element: 'www_figma_com_make_uksn7hqnzimvkydc7zoyv6_web_design_system_for_ip_legal_t_5yv1cy4d1ajkrsxe_1'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ded65e80a0cc4b6f8259307684313fd1'
                        key: {
                            name: 'x_1939459_iplegal_https'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'f81574e3c2d044b5917f3245d75d52d9'
                        key: {
                            name: 'x_1939459_iplegal_https'
                        }
                    },
                ]
            }
        }
    }
}
