import { Record } from '@servicenow/sdk/core'

// Page-layout cluster — wires the welcome widget into a one-column page.
// All cross-references use literal sys_id strings (not Now.ID[...]) because
// data-field references don't resolve via the alias table; see
// vibe_overyonder.md §6 Path A for the rules learned from Cluckworks.

Record({
    $id: Now.ID['bbae84bb22f25b385556415756ee211a'],
    table: 'sp_container',
    data: {
        background_style: 'default',
        bootstrap_alt: false,
        name: 'iplegal_home - container',
        order: 1,
        sp_page: '17e4c760dd49ff080ee95710a05bafbd',
        subheader: false,
        width: 'container-fluid',
    },
})

Record({
    $id: Now.ID['240df96d538e408ac0cfe6d50a522fc4'],
    table: 'sp_row',
    data: {
        order: 1,
        sp_container: 'bbae84bb22f25b385556415756ee211a',
    },
})

Record({
    $id: Now.ID['71c3d7fc8c16c8d130d52609c2cf1069'],
    table: 'sp_column',
    data: {
        order: 1,
        size: 12,
        sp_row: '240df96d538e408ac0cfe6d50a522fc4',
    },
})

Record({
    $id: Now.ID['56b5ccb2c53c76bdcf842b00f2f907a0'],
    table: 'sp_instance',
    data: {
        active: true,
        order: 1,
        sp_column: '71c3d7fc8c16c8d130d52609c2cf1069',
        sp_widget: '3fdd7a9f4cafa2c112b58f73f372f505',
    },
})
