#! /usr/bin/env bash

find . -name "*.pyc" -delete && pipenv run coverage erase && pipenv run coverage run -m pytest && pipenv run coverage report -m
