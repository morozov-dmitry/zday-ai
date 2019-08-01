import React, { Component } from 'react';
import * as ClientAPI from '../utils/APIClient';

class HomeComponent extends Component {

    state = {
        summary: null,
        statistic: [],
    }

    componentDidMount() {
        ClientAPI.getStatistic()
            .then((data) => {
                this.setState({
                    summary: data.summary,
                    statistic: data.statistic
                })
            })
    }

    getMonthName(number) {
        const months = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' 
        ];
        return months[number];
    }

    render() {

        const { summary, statistic } = this.state;

        console.log('statistic', statistic);

        statistic.forEach(stat => {
            console.log('satts', stat);
        })

        return (
            <section class="container">
                {summary && (
                    <div>
                        <h3 style={{marginTop: 20}}>Итоговая статистика</h3>
                        <div>Потребленная энергия с AI: <b>{summary.total_energy_ai.toFixed(2)}</b></div>
                        <div>Потребленная энергия без AI: <b>{summary.total_energy_noai.toFixed(2)}</b></div>
                        <div>Секономленаня энергия (%): <b>{summary.energe_saved.toFixed(2)} %</b></div>
                        <br/>
                        <div>
                            <h3>Статистика температуры и использования</h3>
                            {statistic.map(stat => {return (
                                    <div class="row" style={{margin: 20, paddingBottom: 20, borderBottom: '1px solid black'}}>
                                        <div class="col-sm-12" style={{marginBottom: 20}}>
                                            <h4><i class="fa fa-calendar"></i> Месяц: {this.getMonthName(stat.month)}</h4>
                                            <div>Температура воздуха: <b>{stat.measured_avg_temperature}</b></div>
                                            <div>Температура сервера с AI: <b>{stat.temperature_ai}</b></div>
                                            <div>Температура сервера без AI: <b>{stat.temperature_noai}</b></div>
                                        </div>
                                        <div class="col-sm-12 col-md-12 col-lg-6">
                                            <div class="row">
                                                <div class="col-sm-2" style={{textAlign: 'right'}}>
                                                    <i class="fa fa-users" style={{fontSize: 60}}></i>
                                                </div>  
                                                <div class="col-sm-10">
                                                    <div>Среднее количество пользователей: <b>{stat.measured_avg_users}</b></div>
                                                    <div>Минимальное количестко пользователей: <i>{stat.measured_min_users}</i></div>
                                                    <div>Максимальное количество пользователей: <i>{stat.measured_max_users}</i></div>
                                                </div>    
                                            </div>    
                                        </div> 
                                        <div class="col-sm-12 col-md-12 col-lg-6">
                                        <div class="row">
                                                <div class="col-sm-2" style={{textAlign: 'right'}}>
                                                    <i class="fa fa-database" style={{fontSize: 60}}></i>
                                                </div>  
                                                <div class="col-sm-10">
                                                    <div>Среднее интенсивность работы с данными: <b>{stat.measured_avg_rate_data}</b></div>
                                                    <div>Минимальная интенсивность работы с данными: <i>{stat.measured_min_rate_data}</i></div>
                                                    <div>Максимальное интенсивность работы с данными: <i>{stat.measured_max_rate_data}</i></div>
                                                </div>    
                                            </div>    

                                        </div>    
                                    </div>    
                                )}
                            )}
                        </div>
                        <br/>
                    </div>
                )}
            </section>
        );
    }
}

export default HomeComponent;
