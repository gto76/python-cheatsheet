#!/usr/bin/env python3
#
# Usage: ./update_plots.py
# Updates plots from the Plotly section so they show the latest data.

from pathlib import Path
import datetime
import pandas as pd
from plotly.express import line
import plotly.graph_objects as go
import re


def main():
    """
    This function scrapes the data from the web and wrangles it into a pandas DataFrame.
    It then creates an interactive plotly line graph of covid cases.
    """
    print('Updating covid deaths...')
    update_covid_deaths()
    print('Updating covid cases...')
    update_confirmed_cases()


def update_covid_deaths():
    """
    Update the plot of global COVID-19 deaths over time.

    :param df: A pandas DataFrame with columns 'Continent', 'Date', and 'Total Deaths per Million'.
    """
    covid = pd.read_csv('https://covid.ourworldindata.org/data/owid-covid-data.csv', 
                        usecols=['iso_code', 'date', 'total_deaths', 'population'])
    continents = pd.read_csv('https://gist.githubusercontent.com/stevewithington/20a69c0b6d2ff'
                             '846ea5d35e5fc47f26c/raw/country-and-continent-codes-list-csv.csv',
                             usecols=['Three_Letter_Country_Code', 'Continent_Name'])
    df = pd.merge(covid, continents, left_on='iso_code', right_on='Three_Letter_Country_Code')
    df = df.groupby(['Continent_Name', 'date']).sum().reset_index()
    df['Total Deaths per Million'] = round(df.total_deaths * 1e6 / df.population)
    today = str(datetime.date.today())
    df = df[('2020-02-22' < df.date) & (df.date < today)]
    df = df.rename({'date': 'Date', 'Continent_Name': 'Continent'}, axis='columns')
    gb = df.groupby('Continent')
    df['Max Total Deaths'] = gb[['Total Deaths per Million']].transform('max')
    df = df.sort_values(['Max Total Deaths', 'Date'], ascending=[False, True])
    f = line(df, x='Date', y='Total Deaths per Million', color='Continent')
    f.update_layout(margin=dict(t=24, b=0), paper_bgcolor='rgba(0, 0, 0, 0)')
    update_file('covid_deaths.js', f)
    f.layout.paper_bgcolor = 'rgb(255, 255, 255)'
    write_to_png_file('covid_deaths.png', f, width=960, height=340)


def update_confirmed_cases():
    """
    Update the file covid_cases.js with a plot of total cases, gold price, bitcoin price and Dow Jones index.
    """
    def main():
    """
    This function scrapes the data from the web and wrangles it into a pandas DataFrame.
    It then creates an interactive plotly line graph of covid cases
    in New York State.
    """
        df = wrangle_data(*scrape_data())
        f = get_figure(df)
        update_file('covid_cases.js', f)
        f.layout.paper_bgcolor = 'rgb(255, 255, 255)'
        write_to_png_file('covid_cases.png', f, width=960, height=315)

    def scrape_data():
        """
        This function scrapes data from the following sources:
            1. Our World in Data (Total Cases)
            2. Yahoo Finance (Bitcoin, Gold, Dow Jones)
        The
        function returns a list of pandas Series objects containing the scraped data.
        """
        def scrape_covid():
            """
            This function scrapes the total number of covid cases from a csv file on the internet.
            """
            url = 'https://covid.ourworldindata.org/data/owid-covid-data.csv'
            df = pd.read_csv(url, usecols=['location', 'date', 'total_cases'])
            return df[df.location == 'World'].set_index('date').total_cases
        def scrape_yahoo(slug):
            """
            Downloads historical stock price data from Yahoo Finance.

            :param str slug: The ticker symbol of the desired security. Expected to be a valid argument
            for the `yfinance` function `Ticker()`.
            :returns pd.Series(float): A pandas Series with timestamps as indices and adjusted closing prices as values,
            sorted by timestamp in ascending order.
            """
            url = f'https://query1.finance.yahoo.com/v7/finance/download/{slug}' + \
                  '?period1=1579651200&period2=9999999999&interval=1d&events=history'
            df = pd.read_csv(url, usecols=['Date', 'Close'])
            return df.set_index('Date').Close
        out = [scrape_covid(), scrape_yahoo('BTC-USD'), scrape_yahoo('GC=F'), 
               scrape_yahoo('^DJI')]
        return map(pd.Series.rename, out, ['Total Cases', 'Bitcoin', 'Gold', 'Dow Jones'])

    def wrangle_data(covid, bitcoin, gold, dow):
        """
        This function joins the Dow Jones, Gold and Bitcoin dataframes into a single one.
        It then sorts them by date and interpolates missing values. It
        discards rows before '2020-02-23'.
        Finally it calculates percentages relative to day 1 of each series (Dow Jones, Gold, Bitcoin) 
        and adds a column
        with covid cases. The result is returned as a new dataframe sorted by date in descending order.
        """
        df = pd.concat([dow, gold, bitcoin], axis=1)  # Joins columns on dates.
        df = df.sort_index().interpolate()            # Sorts by date and interpolates NaN-s.
        yesterday = str(datetime.date.today() - datetime.timedelta(1))
        df = df.loc['2020-02-23':yesterday]           # Discards rows before '2020-02-23'.
        df = round((df / df.iloc[0]) * 100, 2)        # Calculates percentages relative to day 1
        df = df.join(covid)                           # Adds column with covid cases.
        return df.sort_values(df.index[-1], axis=1)   # Sorts columns by last day's value.

    def get_figure(df):
        """
        This function returns a plotly figure that shows the total cases of COVID-19 in the US and its economic 
        indicators. The data is taken from [The New
        York Times](#) and retrieved using [NYT API](#).
        """
        figure = go.Figure()
        for col_name in reversed(df.columns):            
            yaxis = 'y1' if col_name == 'Total Cases' else 'y2'
            colors = {'Total Cases': '#EF553B', 'Bitcoin': '#636efa', 'Gold': '#FFA15A', 
                      'Dow Jones': '#00cc96'}
            trace = go.Scatter(x=df.index, y=df[col_name], name=col_name, yaxis=yaxis,
                               line=dict(color=colors[col_name]))
            figure.add_trace(trace)
        figure.update_layout(
            yaxis1=dict(title='Total Cases', rangemode='tozero'),
            yaxis2=dict(title='%', rangemode='tozero', overlaying='y', side='right'),
            legend=dict(x=1.1),
            margin=dict(t=24, b=0),
            paper_bgcolor='rgba(0, 0, 0, 0)'
        )
        return figure

    main()


###
##  UTIL
#

def update_file(filename, figure):
    """
    Updates the file at `filename` with the plotly figure `figure`.

    :param filename: The path to a JSON file containing a Plotly figure.
    :type filename:
    str, required.
        The extension of the file must be .json or .js (for legacy reasons).

        Note that if you are using JupyterLab and want to open
    your updated 
        HTML files in an external browser window then you should save your 
        notebook as an HTML file instead of as a Jupyter notebook.
    For more 
        information see this guide on [using Jupyter with Google Colab](http://jupyter-
    notebook.readthedocs.io/en/stable/examples/Notebook/Running%20Code.html#Running-code).

         If you are not using JupyterLab then it is recommended
    that you use .html for all types of notebooks so that they can be opened in any web browser, including Chrome, Firefox and Edge on Windows and macOS
    without any extra configuration needed (see below for more details). This is because some browsers do not support JavaScript which is used by default
    by Plotly's exporting functions to generate
    """
    lines = read_file(filename)
    f_json = figure.to_json(pretty=True).replace('\n', '\n        ')
    out = lines[:6] + [f'        {f_json}\n', '    )\n', '};\n']
    write_to_file(filename, out)


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
