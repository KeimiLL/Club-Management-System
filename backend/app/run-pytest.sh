#! /usr/bin/env bash

pipenv run coverage run -m pytest && pipenv run coverage report -m
