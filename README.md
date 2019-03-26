# REX-Ray Configuration Generator

[https://rexrayconfig.herokuapp.com/](https://rexrayconfig.herokuapp.com/)

## Description
A dynamically create [REX-Ray configurations](http://rexray.readthedocs.io/en/latest/user-guide/config/) based upon form inputs.

## Usage Instructions
Choose the service to add and begin filling out the forms. Angular.js will detect changes and automatically build out your `config.yml` used for REX-Ray.

At this time, only 1 service can be added and it's encouraged to validate using [yamllint](http://www.yamllint.com/).

## Future

- Add new service types as they are introduced in v0.10.X.
  - New service forms are added using the `/services` folder
- Integrate pre-error checks for certain services where one value takes precedent over another.
   - example. ScaleIO `System Name` vs `System ID`.
- Add Modal/Tooltip/Popover for individual labels explaining what each means. [DONE]
  - This will cut down on the need to refer back to the documentation.
- Add ability to have multiple services and utilize modules
- Add libStorage Server configuration options [1/2 Done]

## Contribution

To do local development, utilize `npm install` and `npm start`.

Create a fork of the project into your own reposity. Make all your necessary changes and create a pull request with a description on what was added or removed and details explaining the changes in lines of code. If approved, project owners will merge it

## Support
Please file bugs and issues on the Github issues page for this project. This is
to help keep track and document everything related to this repo. For general
discussions and further support you can join the [{code} Community slack
channel](http://community.thecodeteam.com/). The code and documentation are
released with no warranties or SLAs and are intended to be supported through a community driven process.
