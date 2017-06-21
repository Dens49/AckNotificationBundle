<?php

namespace Ack\NotificationBundle\Notifier;

use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Predis\Client as RedisClient;
use Ack\NotificationBundle\Notifier\NotifierInterface;

/**
 * Notifier
 */
class Notifier implements NotifierInterface
{
    /**
     * @var EngineInterface
     */
    private $templating;

    /**
     * @var RedisClient
     */
    private $redisClient;

    /**
     * @var bool $active
     */
    protected $active;

    /**
     * NotificationManager constructor.
     *
     * @param EngineInterface $templating
     * @param RedisClient $redisClient
     * @param bool $active
     */
    public function __construct(EngineInterface $templating, RedisClient $redisClient, bool $active)
    {
        $this->templating  = $templating;
        $this->redisClient = $redisClient;
        $this->active = $active;
    }

    /**
     * Notify users
     *
     * @param string $template
     * @param mixed  $users
     * @param array  $parameters
     *
     * @return self
     */
    public function notify($template, $users, $parameters = array())
    {
        if (!$this->active) {
            return $this;
        }

        $content = $this->templating->render(
            $template,
            $parameters
        );

        $notification = array(
            'content' => $content,
            'users'   => is_array($users) ? json_encode($users) : $users
        );

        $this->redisClient->publish('notification', json_encode($notification));
    }

    /**
     * Notify a single user
     *
     * @param string $user
     * @param array $content An associative array
     *
     * @return self
     */
    public function notifySingle($user, array $content)
    {
        if (!$this->active) {
            return $this;
        }

        $json_content = json_encode($content);
        $notification = array(
            'content' => $json_content,
            'users'   => json_encode([$user]),
        );
        $this->redisClient->publish('notification', json_encode($notification));
    }

    /**
     * Notify an array of users (without template)
     *
     * @param array  $users
     * @param array  $content
     *
     * @return self
     */
    public function notifyMultiple(array $users, array $content)
    {
        if (!$this->active) {
            return $this;
        }

        $json_content = json_encode($content);
        $notification = array(
            'content' => $json_content,
            'users'   => json_encode($users),
        );

        $this->redisClient->publish('notification', json_encode($notification));
    }

    /**
     * Notify all users
     *
     * @param array $content An associative array
     *
     * @return self
     */
    public function notifyAll(array $content)
    {
        if (!$this->active) {
            return $this;
        }

        $json_content = json_encode($content);
        $notification = array(
            'content' => $json_content,
            'users'   => json_encode(['*']),
        );
        $this->redisClient->publish('notification', json_encode($notification));
    }
}
