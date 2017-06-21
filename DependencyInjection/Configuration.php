<?php

namespace Ack\NotificationBundle\DependencyInjection;

use Symfony\Component\Config\Definition\ConfigurationInterface;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;

class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('ack_notification');

        $rootNode->children()
            ->booleanNode('notifications_active')
            ->end()
        ;

        return $treeBuilder;
    }
}