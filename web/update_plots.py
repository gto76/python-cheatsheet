#!/usr/bin/env python3
#
# Usage: ./update_plots.py
# Updates plots from the Plotly section so they show the latest data.

from pathlib import Path
from datetime import date, time, datetime, timedelta
import pandas as pd
from plotly.express import line
import plotly.graph_objects as go
import re


def main():
    print('Updating covid deaths...')
    update_covid_deaths()
    print('Updating covid cases...')
    update_confirmed_cases()


def update_covid_deaths():
    def update_readme(date_treshold):
        lines = read_file(Path('..') / 'README.md')
        out = [re.sub("df.date < '\d{4}-\d{2}-\d{2}'", f"df.date < '{date_treshold}'", line) 
                   for line in lines]
        write_to_file(Path('..') / 'README.md', out)
    covid = pd.read_csv('https://covid.ourworldindata.org/data/owid-covid-data.csv', 
                        usecols=['iso_code', 'date', 'total_deaths', 'population'])
    continents = pd.read_csv('https://datahub.io/JohnSnowLabs/country-and-continent-codes-' + \
                             'list/r/country-and-continent-codes-list-csv.csv',
                             usecols=['Three_Letter_Country_Code', 'Continent_Name'])
    df = pd.merge(covid, continents, left_on='iso_code', right_on='Three_Letter_Country_Code')
    df = df.groupby(['Continent_Name', 'date']).sum().reset_index()
    df['Total Deaths per Million'] = df.total_deaths * 1e6 / df.population
    date_treshold = str(date.today() - timedelta(days=2))
    df = df[('2020-03-14' < df.date) & (df.date < date_treshold)]
    df = df.rename({'date': 'Date', 'Continent_Name': 'Continent'}, axis='columns')
    f = line(df, x='Date', y='Total Deaths per Million', color='Continent')
    f.update_layout(margin=dict(t=24, b=0), paper_bgcolor='rgba(0, 0, 0, 0)')
    update_file('covid_deaths.js', f)
    update_readme(date_treshold)
    write_to_png_file('covid_deaths.png', f, width=960, height=340)


def update_confirmed_cases():
    def main():
        df = wrangle_data(*scrape_data())
        f = get_figure(df)
        update_file('covid_cases.js', f)
        write_to_png_file('covid_cases.png', f, width=960, height=315)

    def scrape_data():
        def scrape_yahoo(id_):
            BASE_URL = 'https://query1.finance.yahoo.com/v7/finance/download/'
            now = int(datetime.now().timestamp())
            url = f'{BASE_URL}{id_}?period1=1579651200&period2={now}&interval=1d&events=history'
            return pd.read_csv(url, usecols=['Date', 'Close']).set_index('Date').Close
        covid = pd.read_csv('https://covid.ourworldindata.org/data/owid-covid-data.csv',
                        usecols=['location', 'date', 'total_cases'])
        covid = covid[covid.location == 'World'].set_index('date').total_cases
        dow, gold, bitcoin = [scrape_yahoo(id_) for id_ in ('^DJI', 'GC=F', 'BTC-USD')]
        dow.name, gold.name, bitcoin.name = 'Dow Jones', 'Gold', 'Bitcoin'
        return covid, dow, gold, bitcoin

    def wrangle_data(covid, dow, gold, bitcoin):
        df = pd.concat([dow, gold, bitcoin], axis=1)
        df = df.sort_index().interpolate()
        df = df.rolling(10, min_periods=1, center=True).mean()
        df = df.loc['2020-02-23':].iloc[:-2]
        df = (df / df.iloc[0]) * 100
        return pd.concat([covid, df], axis=1, join='inner')

    def get_figure(df):
        def get_trace(col_name):
            return go.Scatter(x=df.index, y=df[col_name], name=col_name, yaxis='y2')
        traces = [get_trace(col_name) for col_name in df.columns[1:]]
        traces.append(go.Scatter(x=df.index, y=df.total_cases, name='Total Cases', yaxis='y1'))
        figure = go.Figure()
        figure.add_traces(traces)
        figure.update_layout(
            yaxis1=dict(title='Total Cases', rangemode='tozero'),
            yaxis2=dict(title='%', rangemode='tozero', overlaying='y', side='right'),
            legend=dict(x=1.1),
            margin=dict(t=24, b=0),
            paper_bgcolor='rgba(0, 0, 0, 0)'
        )
        return figure

    main()


def update_file(filename, figure):
    lines = read_file(filename)
    f_json = figure.to_json(pretty=True).replace('\n', '\n        ')
    out = lines[:6] + [f'        {f_json}\n', '    )\n', '};\n']
    write_to_file(filename, out)


###
##  UTIL
#

def read_file(filename):
    p = Path(__file__).resolve().parent / filename
    with open(p, encoding='utf-8') as file:
        return file.readlines()


def write_to_file(filename, lines):
    p = Path(__file__).resolve().parent / filename
    with open(p, 'w', encoding='utf-8') as file:
        file.writelines(lines)


def write_to_png_file(filename, figure, width, height):
    p = Path(__file__).resolve().parent / filename
    figure.write_image(str(p), width=width, height=height)


if __name__ == '__main__':
    main()
