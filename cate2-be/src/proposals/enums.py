from enum import StrEnum


class ProposalStatus(StrEnum):
    DRAFT = "draft"
    IN_REVIEW = "in_review"
    SENT = "sent"
    WON = "won"
    REJECTED = "rejected"