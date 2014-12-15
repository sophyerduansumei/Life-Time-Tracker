/**
 * @jsx React.DOM
 */

var React = require('react');
var Moment = require('moment');
var Tag = require('../Tag');
var LogClass = require('../LogClass');
var _ = require('lodash');

var LogClassColors = {
    NT: '#CCC',
    WK: '#84cbbc',
    SPR: '#fdc53b',
    STU: '#BAED86',
    TK: '#000',
    BRK: '#6D6C99'
};

var ProjectCard = React.createClass({

    render: function () {
        var projectData = this.props.data;
        var tags = projectData.tags,
            logClasses = projectData.classes;
        if (!_.isEmpty(tags)) {
            tags = tags.map(function (tag) {
                return (<Tag>{tag}</Tag>);
            });
        }
        var logClasses = logClasses.map(function(cls) {
            return (<LogClass data={cls}/>);
        });
        var lastTasks = projectData.lastTasks.map(function (task) {
            return (<li className="ltt_c-projectCard-task">{task.name}</li>);
        });


        return (
            <div className="ltt_c-projectCard">
                <h1>{projectData.name}</h1>
                <p className="ltt_c-projectCard-tags">{tags}</p>
                <p className="ltt_c-projectCard-logClasses">{logClasses}</p>
                <ul className="ltt_c-projectCard-tasks">{lastTasks}</ul>
                <p className="ltt_c-projectCard-footer">
                    <span className="ltt_c-projectCard-footer-taskCount"><i className="fa fa-tasks"></i>&times;{projectData.taskCount}</span>
                    <span className="ltt_c-projectCard-footer-lastActiveTime">{new Moment(projectData.lastActiveTime).format('YYYY-MM-DD HH:mm')}</span>
                </p>
                {this.getLogClassIndicators()}
            </div>
        );
    },

    getLogClassIndicators: function () {
        var logClasses = this.props.data.classes,
            indicators;
        if (!_.isEmpty(logClasses)) {
            indicators = logClasses.map(function (cls) {
                var style = {
                    'background-color': LogClassColors[cls.code]
                };
                return <i title={cls.name} style={style}></i>
            });
        }
        return (<p className="ltt_c-projectCard-logClassIndicators">{indicators}</p>);
    }

});

module.exports = ProjectCard;