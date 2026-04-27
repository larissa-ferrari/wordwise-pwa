import enum


class GenreEnum(str, enum.Enum):
    fantasy = "fantasy"
    romance = "romance"
    thriller = "thriller"
    literary = "literary"
    scifi = "scifi"
    horror = "horror"
    nonfiction = "nonfiction"
    manga = "manga"


class AestheticEnum(str, enum.Enum):
    dark_academia = "dark-academia"
    cottagecore = "cottagecore"
    minimalist = "minimalist"
    fantasy = "fantasy"
    vibrant = "vibrant"


class EmotionEnum(str, enum.Enum):
    love = "love"
    cried = "cried"
    laughed = "laughed"
    surprised = "surprised"
    irritated = "irritated"
    absorbed = "absorbed"
    excited = "excited"
    peaceful = "peaceful"


class ReadingMoodEnum(str, enum.Enum):
    escape = "escape"
    learn = "learn"
    cry = "cry"
    laugh = "laugh"
    challenge = "challenge"
    thrill = "thrill"


class ShelfTypeEnum(str, enum.Enum):
    reading = "reading"
    read = "read"
    want = "want"
