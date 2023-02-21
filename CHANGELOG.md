# CHANGELOG

All notable changes to this project are documented in this file following the [Keep a CHANGELOG](https://keepachangelog.com/en/1.0.0/) conventions.

## [2.0.3] - 2023-02-21

### Security

- Updated 'cookiejar' to v2.1.4

## [2.0.2] - 2023-01-09

### Security

- Updated 'json5' to v2.1.2

## [2.0.1] - 2022-12-17

### Security

- Updated 'qs' from 6.9.3 to 6.9.7
- Updated 'formidable' from 2.0.1 to 2.1.1

## [2.0.0] - 2022-12-17

## [2.0.0-beta.1] - 2022-11-08

### Changed

- Structured all tests

### Added

- Added proper unit tests
- Added coverage folder
- Added husky

## [2.0.0-alpha.4] - 2022-11-02

### Added

- Added husky
- Added HttpError interface

### Changed

- Moved 3rd party related files into src/api/v2/lib folder

### Fixed

- Fixed serialization error when logging in

## [2.0.0-alpha.3] - 2022-10-23

### Added

- Added image functionality. User can now upload images and append them to meals

### Changed

- Changed links to other documents in models

## [2.0.0-alpha.2] - 2022-09-26

### Added

- Added restaurant entity

### Changed

- Required property restaurant in meal model

## [2.0.0-alpha.1] - 2022-09-21

### Added

- Added meal rating and calories

### Changed

- Only specific values can be used as meal tags
- Renamed a few capitalized files
- Use ~ in package.json
- Use vegan and vegetarian tags instead of isVegan and isVegetarian props in meal

## [1.0.2] - 2022-09-18

### Fixed

- Fixed additional id in user model

## [1.0.1] - 2022-09-09

### Fixed

- Fixed crashing app when sorting database

## [1.0.0] - 2022-08-21

### Fixed

- Fixed google / facebook login 500 error

### Added

- Added .vscode/launch.json

### Security

- Updated mongoose v6.2.7 &rarr; 6.5.2
- Updated passport v0.5.3 &rarr; 0.6.0

## [1.0.0-rc] - 2022-07-06

### Added

- Added status property on HttpError

### Changed

- Changed fail responses
- Implemented DIJ

### Security

- Updated nodemon v2.0.18 &rarr; 2.0.19

## [1.0.0-alpha.2] - 2022-06-26

### Added

- Automatically change total price / status of order when updating.

### Changed

- Changed docs structure
- Refactored tests

### Fixed

- Fixed validation bugs

## [1.0.0-alpha.1] - 2022-06-23

Initial version.
