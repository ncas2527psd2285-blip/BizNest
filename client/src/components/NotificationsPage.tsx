import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:5000/api";

type Notification = {
  _id: string;
  title?: string;
  message?: string;
  type?: string;
  priority?: string;
  isRead?: boolean;
  read?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type Props = {
  token: string;
};

const getTypeClass = (type?: string) => {
  switch (type?.toUpperCase()) {
    case "SUCCESS":
      return "notification-type success";

    case "WARNING":
      return "notification-type warning";

    case "ERROR":
    case "DANGER":
      return "notification-type error";

    case "INFO":
      return "notification-type info";

    default:
      return "notification-type info";
  }
};

const getPriorityClass = (
  priority?: string
) => {
  switch (priority?.toUpperCase()) {
    case "HIGH":
    case "URGENT":
      return "priority-badge high";

    case "MEDIUM":
      return "priority-badge medium";

    case "LOW":
      return "priority-badge low";

    default:
      return "priority-badge medium";
  }
};

const isNotificationRead = (
  notification: Notification
) => {
  if (
    typeof notification.isRead ===
    "boolean"
  ) {
    return notification.isRead;
  }

  if (
    typeof notification.read ===
    "boolean"
  ) {
    return notification.read;
  }

  return false;
};

export default function NotificationsPage({
  token,
}: Props) {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [filter, setFilter] =
    useState("ALL");

  const [search, setSearch] =
    useState("");

  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const loadNotifications =
    async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
              "Failed to load notifications"
          );
        }

        const data =
          result.data?.notifications ??
          result.data ??
          [];

        setNotifications(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load notifications"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadNotifications();
  }, []);

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          !isNotificationRead(
            notification
          )
      ).length,
    [notifications]
  );

  const filteredNotifications =
    useMemo(() => {
      const value =
        search.trim().toLowerCase();

      return notifications.filter(
        (notification) => {
          const read =
            isNotificationRead(
              notification
            );

          const matchesFilter =
            filter === "ALL" ||
            (filter === "UNREAD" &&
              !read) ||
            (filter === "READ" &&
              read);

          const matchesSearch =
            !value ||
            notification.title
              ?.toLowerCase()
              .includes(value) ||
            notification.message
              ?.toLowerCase()
              .includes(value) ||
            notification.type
              ?.toLowerCase()
              .includes(value);

          return (
            matchesFilter &&
            matchesSearch
          );
        }
      );
    }, [
      notifications,
      filter,
      search,
    ]);

  const markAsRead = async (
    notification: Notification
  ) => {
    if (
      isNotificationRead(
        notification
      )
    ) {
      return;
    }

    setError("");

    try {
      const response = await fetch(
        `${API_URL}/notifications/${notification._id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed to mark notification as read"
        );
      }

      setNotifications(
        (current) =>
          current.map(
            (item) =>
              item._id ===
              notification._id
                ? {
                    ...item,
                    isRead: true,
                    read: true,
                  }
                : item
          )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to mark notification as read"
      );
    }
  };

  const markAllAsRead =
    async () => {
      if (unreadCount === 0) {
        return;
      }

      setError("");

      try {
        const response =
          await fetch(
            `${API_URL}/notifications/read-all`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
              "Failed to mark notifications as read"
          );
        }

        setNotifications(
          (current) =>
            current.map(
              (notification) => ({
                ...notification,
                isRead: true,
                read: true,
              })
            )
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to mark notifications as read"
        );
      }
    };

  const deleteNotification =
    async (
      notification: Notification
    ) => {
      const confirmed =
        window.confirm(
          "Delete this notification?"
        );

      if (!confirmed) {
        return;
      }

      setError("");

      try {
        const response =
          await fetch(
            `${API_URL}/notifications/${notification._id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
              "Failed to delete notification"
          );
        }

        setNotifications(
          (current) =>
            current.filter(
              (item) =>
                item._id !==
                notification._id
            )
        );

        if (
          selectedNotification?._id ===
          notification._id
        ) {
          setSelectedNotification(
            null
          );
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to delete notification"
        );
      }
    };

  const openNotification = (
    notification: Notification
  ) => {
    setSelectedNotification(
      notification
    );

    if (
      !isNotificationRead(
        notification
      )
    ) {
      markAsRead(notification);
    }
  };

  return (
    <section className="customers-page">

      <div className="page-toolbar">

        <div>
          <h2>
            Notifications
          </h2>

          <p>
            Stay updated with
            important business
            activities
          </p>
        </div>

        <div className="toolbar-actions">

          <button
            className="secondary-button"
            onClick={
              loadNotifications
            }
          >
            Refresh
          </button>

          <button
            className="primary-button"
            onClick={
              markAllAsRead
            }
            disabled={
              unreadCount === 0
            }
          >
            Mark All as Read
          </button>

        </div>

      </div>

      <div className="cards">

        <div className="stat-card">

          <span>
            Total
          </span>

          <strong>
            {notifications.length}
          </strong>

        </div>

        <div className="stat-card">

          <span>
            Unread
          </span>

          <strong>
            {unreadCount}
          </strong>

        </div>

        <div className="stat-card">

          <span>
            Read
          </span>

          <strong>
            {
              notifications.length -
              unreadCount
            }
          </strong>

        </div>

        <div className="stat-card">

          <span>
            High Priority
          </span>

          <strong>
            {
              notifications.filter(
                (notification) =>
                  notification.priority?.toUpperCase() ===
                    "HIGH" ||
                  notification.priority?.toUpperCase() ===
                    "URGENT"
              ).length
            }
          </strong>

        </div>

      </div>

      <div className="search-bar">

        <input
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="Search notifications..."
        />

        <select
          value={filter}
          onChange={(event) =>
            setFilter(
              event.target.value
            )
          }
        >

          <option value="ALL">
            All Notifications
          </option>

          <option value="UNREAD">
            Unread
          </option>

          <option value="READ">
            Read
          </option>

        </select>

      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <div className="notification-list">

        {loading ? (

          <div className="table-empty">
            Loading notifications...
          </div>

        ) : filteredNotifications.length ===
          0 ? (

          <div className="table-empty">

            <div className="empty-large">
              🔔
            </div>

            <h3>
              {search ||
              filter !== "ALL"
                ? "No notifications found"
                : "You're all caught up"}
            </h3>

            <p>
              {search ||
              filter !== "ALL"
                ? "Try changing your search or filter."
                : "New business notifications will appear here."}
            </p>

          </div>

        ) : (

          filteredNotifications.map(
            (notification) => {

              const read =
                isNotificationRead(
                  notification
                );

              return (
                <div
                  className={`notification-card ${
                    read
                      ? "read"
                      : "unread"
                  }`}
                  key={
                    notification._id
                  }
                  onClick={() =>
                    openNotification(
                      notification
                    )
                  }
                >

                  <div
                    className={getTypeClass(
                      notification.type
                    )}
                  >
                    {(
                      notification.type ||
                      "INFO"
                    ).charAt(0)}
                  </div>

                  <div className="notification-content">

                    <div className="notification-header">

                      <div>

                        <h3>
                          {
                            notification.title ||
                            "Notification"
                          }
                        </h3>

                        {!read && (
                          <span className="unread-dot" />
                        )}

                      </div>

                      <span
                        className={getPriorityClass(
                          notification.priority
                        )}
                      >
                        {(
                          notification.priority ||
                          "MEDIUM"
                        ).toUpperCase()}
                      </span>

                    </div>

                    <p>
                      {
                        notification.message ||
                        "No message available."
                      }
                    </p>

                    <div className="notification-footer">

                      <span>
                        {notification.createdAt
                          ? new Date(
                              notification.createdAt
                            ).toLocaleString(
                              "en-IN"
                            )
                          : "Recently"}
                      </span>

                      <div className="notification-actions">

                        {!read && (
                          <button
                            className="icon-button edit"
                            onClick={(
                              event
                            ) => {
                              event.stopPropagation();
                              markAsRead(
                                notification
                              );
                            }}
                          >
                            Mark Read
                          </button>
                        )}

                        <button
                          className="icon-button delete"
                          onClick={(
                            event
                          ) => {
                            event.stopPropagation();
                            deleteNotification(
                              notification
                            );
                          }}
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              );
            }
          )

        )}

      </div>

      {selectedNotification && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedNotification(
                null
              );
            }
          }}
        >

          <div className="modal">

            <div className="modal-header">

              <div>

                <h2>
                  {
                    selectedNotification.title ||
                    "Notification"
                  }
                </h2>

                <p>
                  Notification details
                </p>

              </div>

              <button
                className="close-button"
                onClick={() =>
                  setSelectedNotification(
                    null
                  )
                }
              >
                ×
              </button>

            </div>

            <div className="order-detail-summary">

              <div>

                <span>
                  Type
                </span>

                <strong>
                  {(
                    selectedNotification.type ||
                    "INFO"
                  ).toUpperCase()}
                </strong>

              </div>

              <div>

                <span>
                  Priority
                </span>

                <strong>
                  {(
                    selectedNotification.priority ||
                    "MEDIUM"
                  ).toUpperCase()}
                </strong>

              </div>

              <div>

                <span>
                  Status
                </span>

                <strong>
                  {isNotificationRead(
                    selectedNotification
                  )
                    ? "READ"
                    : "UNREAD"}
                </strong>

              </div>

            </div>

            <div className="order-notes">

              <strong>
                Message
              </strong>

              <p>
                {
                  selectedNotification.message ||
                  "No message available."
                }
              </p>

            </div>

            {selectedNotification.createdAt && (
              <div className="order-notes">

                <strong>
                  Created
                </strong>

                <p>
                  {new Date(
                    selectedNotification.createdAt
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>
            )}

            <div className="modal-actions">

              {!isNotificationRead(
                selectedNotification
              ) && (
                <button
                  className="primary-button"
                  onClick={() =>
                    markAsRead(
                      selectedNotification
                    )
                  }
                >
                  Mark as Read
                </button>
              )}

              <button
                className="secondary-button"
                onClick={() =>
                  setSelectedNotification(
                    null
                  )
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}