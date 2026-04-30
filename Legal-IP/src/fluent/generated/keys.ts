import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: 'd2b654a56ede4687b9a118ae96a78ca7'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '2ecffc9b43d442b5a7b2c1879842cd45'
                    }
                }
                composite: [
                    {
                        table: 'sys_dictionary'
                        id: '00cfdf8c95254eafab3a5eec1101df4c'
                        key: {
                            name: 'x_1939459_property_work_log'
                            element: 'work_order'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '06c6fb6a27704fec904f623e5e80081f'
                        key: {
                            name: 'x_1939459_property_repair_category'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '08bd77ced0814321a6f8fad89ee533f3'
                        key: {
                            name: 'x_1939459_property_work_order'
                            element: 'property'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1ba181d1883142c492d4cf55da17719b'
                        key: {
                            name: 'x_1939459_property_work_order'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1bd3acebd82f431ebdb0532358b0db4b'
                        key: {
                            name: 'x_1939459_property_work_log'
                            element: 'entry_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2073e263906b4106a2449427e3e7d45a'
                        key: {
                            name: 'x_1939459_property_work_order'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '227866d003444c4eb283a71c86de5c55'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'address2'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2d5c331385ee48f78acb33137a6b8974'
                        key: {
                            name: 'x_1939459_property_work_order'
                            element: 'estimated_cost'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3118d4c2a79e448a93c3512991dc90b2'
                        key: {
                            name: 'x_1939459_property_space'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '312c549e9ec943908795212bfc3e1244'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'address1'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '31bf481ee072449d97c65a6011cbc497'
                        key: {
                            name: 'x_1939459_property_space'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3206c79aded646f6ab8ed948ecc5785d'
                        key: {
                            name: 'x_1939459_property_work_order'
                            element: 'estimated_cost'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '3292e383bc1b4416af6514a417bec520'
                        key: {
                            name: 'x_1939459_property_space'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '369cf17260c84a009233d7e5f9e3c980'
                        key: {
                            name: 'x_1939459_property_space'
                            element: 'space_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '397440f7f4fe4ec4be99754e183f9e2f'
                        key: {
                            name: 'x_1939459_property_repair_category'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3b17863cd2a8493796cbc9ab4abeaa7e'
                        key: {
                            name: 'x_1939459_property_space'
                            element: 'floor'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3fec9a2cf51e4387aef90dfec5838ce8'
                        key: {
                            name: 'x_1939459_property_repair_category'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4385de835a27448d953ea26d32919127'
                        key: {
                            name: 'x_1939459_property_space'
                            element: 'property'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '4580a80925c74a6fa8a200065a44baa6'
                        key: {
                            name: 'x_1939459_property_space'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '461d01870d594d7b9f598c47b8c24ebc'
                        key: {
                            name: 'x_1939459_property_property'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4784e82b98234ae2a8f3d1014979f087'
                        key: {
                            name: 'x_1939459_property_work_log'
                            element: 'cost'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4f26d37adc6548bdbf4d9f34c14cd322'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4f8fe7f279ee4f6c888ee62dd16595e6'
                        key: {
                            name: 'x_1939459_property_space'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '52021bfb62724481a4087f3e9ae944cf'
                        key: {
                            name: 'x_1939459_property_work_log'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '542f622b14364f05b68d6d657daebbe2'
                        key: {
                            name: 'x_1939459_property_repair_category'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '56f58f07bf334b5cbcbde4e510c03697'
                        key: {
                            name: 'x_1939459_property_work_log'
                            element: 'date_worked'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5ff60002f8e6411c868372af90a92f40'
                        key: {
                            name: 'x_1939459_property_work_order'
                            element: 'category'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '61ca9aaae0044f8c89290e0956e23423'
                        key: {
                            name: 'x_1939459_property_repair_category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '68dbdd4e56924ea1a68e482d48b8f7b6'
                        key: {
                            name: 'x_1939459_property_space'
                            element: 'property'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '69cf98a06a4c432686c4a3dbf53af71f'
                        key: {
                            name: 'x_1939459_property_work_order'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6fe61aac582746cb8627da2646704d0b'
                        key: {
                            name: 'x_1939459_property_repair_category'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '7135b4eb48b04f98bee30b6eb2cd996a'
                        key: {
                            name: 'x_1939459_property_work_log'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '71aefa8d72664e54a6f976dba314a0a0'
                        key: {
                            name: 'x_1939459_property.user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '72588c26cb5c4e50bf083fd51c8fbc33'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '73c3b63b2fbc4908bbb15fb70d4aea30'
                        key: {
                            name: 'x_1939459_property_space'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '7712fdb9d0754a6b8395237c044561a5'
                        key: {
                            name: 'x_1939459_property_property'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7e152609c94a456998b91db58da84ea9'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7fa97078bb5549499ff26228a3303110'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7fc76745745443e28cdaeb5d1a897cbe'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'address2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '83e2e41329f84a68865e0109a7375f59'
                        key: {
                            name: 'x_1939459_property_space'
                            element: 'floor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '87a4cbb02381404383a4ad1e5d1b84a1'
                        key: {
                            name: 'x_1939459_property_work_log'
                            element: 'work_order'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8973bcb93ef047f8b3af3b3f70463852'
                        key: {
                            name: 'x_1939459_property_work_order'
                            element: 'space'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8fb6d7afc3cc426db0c783507fc4a5d4'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'city'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9376f2631c24490d8986bf3de92ff02e'
                        key: {
                            name: 'x_1939459_property_work_log'
                            element: 'minutes_worked'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '98307e82c0b947d28e6c180f8af23087'
                        key: {
                            name: 'x_1939459_property_repair_category'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9867f08f541e4da5a00333c148059539'
                        key: {
                            name: 'x_1939459_property_work_log'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '9b18234820524ed38494d11cfa5a0523'
                        key: {
                            name: 'x_1939459_property_repair_category'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9f764e29b8f4478caed864cd64dc7583'
                        key: {
                            name: 'x_1939459_property_space'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a44c95f8415a466e8852819afbadb3ac'
                        key: {
                            name: 'x_1939459_property_work_log'
                            element: 'date_worked'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a9b16461e8414d45a59b523f688fa3ee'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'address1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ada4be03aea74b9ca98cb20c4eb78cf1'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'postal_code'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b53b441f1cb547dd9472dc47799963b7'
                        key: {
                            name: 'x_1939459_property_space'
                            element: 'type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b762f1102e9c493cb1124ee27bf1683a'
                        key: {
                            name: 'x_1939459_property_work_order'
                            element: 'property'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'b88542af2fad4c8080fed179fe32a1c4'
                        key: {
                            name: 'x_1939459_property_work_order'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ba22d30dc141457a8ab61309fb280c20'
                        key: {
                            name: 'x_1939459_property_repair_category'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bb2b6d2d6f5d4a779546dc730b21288c'
                        key: {
                            name: 'x_1939459_property_work_log'
                            element: 'entry_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c3fd87fab65a4cfa900d994258b93ae8'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c532123daf6943a2b35c9cd2e0fd391a'
                        key: {
                            name: 'x_1939459_property_work_log'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c72d93bf3a904c1eb5d717e32da0e217'
                        key: {
                            name: 'x_1939459_property_work_log'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c84649bf94b2446bab1adb28af78780d'
                        key: {
                            name: 'x_1939459_property_work_order'
                            element: 'space'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cf54fe8d692340599869bb16c783c0b3'
                        key: {
                            name: 'x_1939459_property_work_order'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd008d7e137d6449c834f6f836c484c41'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'city'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd264a205865d4898b5186bf3b88dd84a'
                        key: {
                            name: 'x_1939459_property_space'
                            element: 'space_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd780dd0e4f904085b301f1d92b90a620'
                        key: {
                            name: 'x_1939459_property_work_log'
                            element: 'cost'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dd75007481c14bbfb3d698c67527dc58'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'deea1dfb987a448ba6b975ba629e56e7'
                        key: {
                            name: 'x_1939459_property_work_log'
                            element: 'minutes_worked'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e08fa82980f54a03829c2ecbc94a2d28'
                        key: {
                            name: 'x_1939459_property_repair_category'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e3e661331f884e6483c03158f1c17e92'
                        key: {
                            name: 'x_1939459_property_work_log'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e563903176f04172b1f3dd5351846cb6'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e9bb8b5f63fc414ca08a2ff325305f1c'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'code'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'eeb2b080e2714f7ca997c06b09b70a72'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'postal_code'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f86c567edf2e491eb09f12ee8895007a'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f9f63fe9dba949929bac643c9b1a9d5d'
                        key: {
                            name: 'x_1939459_property_property'
                            element: 'code'
                            language: 'en'
                        }
                    },
                ]
            }
        }
    }
}
