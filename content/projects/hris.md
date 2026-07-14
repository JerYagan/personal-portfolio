---
title: "HRIS"
type: "Full stack"
year: "2024"
description: "Human Resource Information System for managing employee data, attendance, and payroll."
tags: ["React", "Node.js", "PostgreSQL"]
image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=760&fit=crop&auto=format"
featured: false
slug: "hris"
role: "Full Stack Developer"
timeline: "12 weeks"
team: "2 people"
status: "Completed"
subtitle: "Managing HR and payroll with a centralized system."
appUrl: "APP.HRIS-PORTAL.COM"
demo: "https://hris.vercel.app"
github: "https://github.com/user/hris"
---
# Overview
This system helps internal HR teams manage employee profiles, track attendance, and process payroll without spreadsheets.

# Problem & Solution
## The Problem
Handling employee records and payroll manually through files led to calculation errors and data inconsistencies.
## The Solution
A centralized system that handles profiles, automatically calculates hours, and exports payroll directly.

# Features
- **Employee Directory**: Easily filter and manage comprehensive staff profiles.
- **Attendance Tracker**: Auto-calculate working hours, leave requests, and overtime.
- **Payroll Manager**: Generate payslips and compile tax sheets in seconds.

# Gallery
- label: "Directory review"
  url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&h=1040&fit=crop&auto=format"

# Architecture
- client: "React → SPA View Engine"
- clientExtra: "Tailwind CSS → clean interface design"
- data: "Express.js + Node.js → core backend engine"
- dataExtra: "PostgreSQL → relational staff database"
- delivery: "Vercel + Render → simple cloud hosting"
- summary: "Separating the API from the frontend makes the portal reliable and guarantees data privacy."

# Learnings
## Challenge
Ensuring secure handling of employee financial and personal records.
## Lesson
Build security and privacy into the database layer from day one.
