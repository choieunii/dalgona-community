import React from 'react';
import { Link } from 'react-router-dom';
import star from 'images/star_filled.png';
import './PointList.scss';

const PointList = (props) => {
    return props.myPoint.map((point) => {
        return (
            <div key={point.id} className="point-list">
                <div className="point-list__date">
                    <span>{props.myPoint.created_at}</span>
                </div>
                <div className="point-list__activity">
                    <div className="only-pc">
                        <div className="point-list__activity-img"></div>
                    </div>
                    <div className="point-list__activity-info">
                        <div className="point-list__activity-info-title">{point.information}</div>
                        <div className="point-list__activity-info-luna">{point.kind}</div>
                    </div>
                    <div className="only-pc">
                        <div className="point-list__activity-point">+ {point.points}</div>
                    </div>
                    <div className="not-pc">
                        <div className="point-list__activity-point mobile">
                            <span>+ {point.points}개</span>
                            <img src={star}></img>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
};

export default PointList;
