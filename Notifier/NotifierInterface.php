<?php

namespace Ack\NotificationBundle\Notifier;

/**
 * NotifierInterface
 */
interface NotifierInterface
{
    /**
     * Notify users
     *
     * @param string $template
     * @param mixed  $users
     * @param array  $parameters
     *
     * @return self
     */
    public function notify($template, $users, $parameters = array());

    /**
     * Notify a single user
     *
     * @param string $user
     * @param array $content An associative array
     *
     * @return self
     */
    public function notifySingle($user, array $content);

    /**
     * Notify an array of users
     *
     * @param array  $users
     * @param array  $content
     *
     * @return self
     */
    public function notifyMultiple(array $users, array $content);

    /**
     * Notify all users
     *
     * @param array $content An associative array
     *
     * @return self
     */
    public function notifyAll(array $content);
}
