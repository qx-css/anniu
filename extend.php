<?php
namespace QxCss\Anniu;

use Flarum\Extend;
use Flarum\Frontend\Document;
use QxCss\Anniu\Providers\SwitchDisplayProvider;

return [
    // 1. 注册设置项：在后台创建一个开关
    (new Extend\Settings)
        ->serializeToForum('anniuEnabled', 'anniu.enabled', 'boolval', false)
        ->default('anniu.enabled', false),

    // 2. 注册前端资源（JS）
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/src/forum/index.js')
        ->content(function (Document $document) {
            // 向后端查询开关状态，并注入到前端全局变量
            $enabled = resolve('flarum.settings')->get('anniu.enabled', false);
            $document->payload['anniuEnabled'] = (bool)$enabled;
        }),

    // 3. 注册内容提供者，用于逻辑控制
    (new Extend\ServiceProvider())
        ->register(SwitchDisplayProvider::class),

    // 4. 注册后台设置页的翻译
    (new Extend\Locales(__DIR__ . '/locale'))
];