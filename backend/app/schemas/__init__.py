"""File for updating forward ref on required schemas."""


# pylint: disable=unused-import
from app.schemas.coach import Coach, CoachInDBBase
from app.schemas.injury import Injury, InjuryInDBBase
from app.schemas.match import Match, MatchInDBBase
from app.schemas.match_player import MatchPlayer, MatchPlayerInDBBase
from app.schemas.meeting import Meeting, MeetingCreateNoUserId, MeetingInDBBase
from app.schemas.meeting_user import (
    MeetingUser,
    MeetingUserCreateUserIdList,
    MeetingUserInDBBase,
)
from app.schemas.player import Player, PlayerInDBBase
from app.schemas.team import Team, TeamInDBBase
from app.schemas.training import Training, TrainingInDBBase
from app.schemas.training_player import TrainingPlayer, TrainingPlayerInDBBase
from app.schemas.user import User, UserInDBBase, UserInDBOnlyBaseInfo

Coach.model_rebuild()
CoachInDBBase.model_rebuild()
Match.model_rebuild()
MatchInDBBase.model_rebuild()
MatchPlayer.model_rebuild()
MatchPlayerInDBBase.model_rebuild()
Meeting.model_rebuild()
MeetingInDBBase.model_rebuild()
MeetingUser.model_rebuild()
MeetingUserCreateUserIdList.model_rebuild()
MeetingUserInDBBase.model_rebuild()
Player.model_rebuild()
PlayerInDBBase.model_rebuild()
Team.model_rebuild()
TeamInDBBase.model_rebuild()
Training.model_rebuild()
TrainingInDBBase.model_rebuild()
TrainingPlayer.model_rebuild()
TrainingPlayerInDBBase.model_rebuild()
User.model_rebuild()
UserInDBBase.model_rebuild()
UserInDBOnlyBaseInfo.model_rebuild()
