// Regular expressions for input validation
const NAME_REGEX = /^[a-zA-Z-\s]+$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;
const PHONE_REGEX = /^((\+91)?|91?|0)?[789][0-9]{9}$/;
const PASSWORD_REGEX =
  /^(?=.*[-\#\$\.\%\&\@\!\+\=\<\>\*])(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

// Avatar from DiceBear
const AVATAR_IMAGE_SIZE = 200;
const DEFAULT_AVATAR = (name) =>
  `https://avatars.dicebear.com/api/initials/${name}.svg?size=${AVATAR_IMAGE_SIZE}`;

module.exports = {
  NAME_REGEX,
  EMAIL_REGEX,
  USERNAME_REGEX,
  PHONE_REGEX,
  PASSWORD_REGEX,
  DEFAULT_AVATAR,
};
