from enum import StrEnum


class Role(StrEnum):
    ADMIN = "admin"
    EVENT_DESIGNER = "event_designer"
    EVENT_PRODUCER = "event_producer"