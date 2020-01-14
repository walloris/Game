﻿var definedLevels = [
    {
        width: 252,
        height: 15,
        id: 0,
        background: 1,
        data:
            [
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', 'mana', 'grass_top_left', '', '', '', '', '', '', '', '', 'Player', 'grass_top', 'soil'],
                ['', '', 'mana', 'grass_top', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['mana', 'grass_top', '', '', '', '', '', '', '', '', 'grass_top_left', 'grass_top', 'soil'],
                ['mana', 'grass_top', '', '', '', '', '', '', '', '', 'grass_top', 'grass_top', 'soil'],
                ['', '', 'mana', 'grass_top', '', '', '', '', '', '', '', '', 'grass_top', 'grass_top', 'soil'],
                ['', '', 'mana', 'grass_top', '', '', '', '', '', '', '', '', 'grass_top', 'grass_top', 'soil'],
                ['', '', 'troll', 'grass_top_right', '', '', '', '', '', '', '', '', 'grass_top_right', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', 'grass_top_left', '', '', '', '', '', '', 'grass_top', 'grass_top', 'soil'],
                ['', '', '', '', '', 'grass_top', '', '', '', '', '', '', 'grass_top', 'grass_top', 'soil'],
                ['', '', '', '', '', 'grass_top', '', '', '', '', '', '', 'grass_top', 'grass_top', 'soil'],
                ['', '', '', '', '', 'grass_top', '', '', '', '', '', '', 'grass_top', 'grass_top', 'soil'],
                ['', '', '', '', '', 'grass_top', '', '', '', '', '', '', 'grass_top', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', 'grass_top', '', '', '', '', 'mana', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', 'grass_top', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', 'grass_top', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', 'grass_top_right', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'grass_top'],
                ['', '', '', '', '', '', '', '', '', 'grass_top_left', '', '', '', 'grass_top', 'grass_top'],
                ['', '', '', '', '', '', '', '', '', 'grass_top', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', 'grass_top', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', 'grass_top', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', 'grass_top', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', 'grass_top_right', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', 'goblin', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top_left', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', 'mana', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', 'goblin', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '  ', '   ', '   ', '   ', '   '],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '   ', ''],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top_left', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', ' ', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', ' ', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', 'goblin', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '  ', '   '],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '   ', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', ' ', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', ' ', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', ' ', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', ' ', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', ' ', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', ' ', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', ' ', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', ' ', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', ' ', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', ' ', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', 'dummy', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '  ', '   '],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '   ', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', 'goblin', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '  ', '   '],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '   ', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', 'goblin', 'grass_top', 'soil'],
                ['', '', '', '', '', '', 'starbox', '', '', '', ' ', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', ' ', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top_left', '', '', '', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', ' ', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', ' ', '', '', '', 'grass_top', '', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', '', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', '', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', 'goblin', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '  ', '   ', '   ', '   ', '   '],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '   ', ''],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top_left', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', ' ', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', ' ', '', '', '', 'grass_top', '', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', '', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', '', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', 'ogr', 'grass_top', 'soil', 'soil', 'soil', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '  ', '   '],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '   ', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', 'troll', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', 'mana', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', 'mana', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', 'soil_right'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', ' ', ' ', '', 'soil_left'],
                ['', '', '', '', '', '', '', '', '', '', '', ' ', 'ogr ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', ' ', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', ' ', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', ' ', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', ' ', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', ' ', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', ' ', ' ', ' ', '', 'soil_right'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', '', '', ' ', '', 'soil_left'],
                ['', '', '', '', '', '', '', '', '', '', '', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', ' ', 'mana', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', ' ', ' ', '', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', ' ', ' ', 'mana', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', ' ', '', ' ', ' ', '', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', ' ', ' ', 'mana', ' ', ' ', 'mana', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', ' ', ' ', ' ', '', ' ', ' ', ' ', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', ' ', ' ', ' ', ' ', 'mana', ' ', ' ', ' ', ' ', ' ', 'grass_top', 'soil'],
                ['', '', ' ', ' ', ' ', ' ', ' ', '', ' ', ' ', ' ', ' ', ' ', 'grass_top', 'soil'],
                ['', ' ', ' ', ' ', ' ', ' ', ' ', 'mana', ' ', ' ', ' ', ' ', ' ', 'grass_top', 'soil'],
                ['', ' ', ' ', ' ', ' ', ' ', ' ', '', ' ', ' ', ' ', ' ', ' ', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', 'mana', '', 'mana', '', 'mana', '', 'mana', '', 'mana', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', 'troll', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', '', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', 'invisible_block', 'grass_top', 'soil'],
                ['', '', '', '', '', '', '', '', '', '', '', '', 'dummy', 'grass_top', 'soil']
            ]
    }];