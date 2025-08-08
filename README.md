# DevLake Automation & Monitoring System

A comprehensive production-ready system for automating DevLake project management and monitoring blueprint execution with Prometheus metrics and intelligent failure detection.

## 🎯 Purpose

This system provides complete automation for DevLake data collection workflows:

- **🔍 Plugin & Connection Discovery**: Automatically discovers all configured DevLake plugins and connections
- **🔄 Repository Synchronization**: Syncs repositories from remote sources (GitHub, GitLab, Bitbucket, Jira, Azure DevOps)
- **🏗️ Project & Blueprint Creation**: Creates DevLake projects and scope configurations for each repository
- **📊 Data Collection Orchestration**: Manages data collection pipelines with intelligent retry logic
- **👁️ Real-time Monitoring**: Continuously monitors blueprint status with Prometheus metrics
- **🚨 Smart Alerting**: Detects failures and exposes metrics (no notification spam)

## 📋 Workflow Overview

### 1. Automation Process (Daily Daemon)
The `manage_projects.py` daemon runs daily at 6PM Vietnam time:

1. **🔍 Discovery**: Scans all DevLake plugins and their connections
2. **📥 Repository Sync**: Syncs new repositories from remote sources  
3. **⚙️ Configuration**: Creates scope configs for all repository connections
4. **🏗️ Project Creation**: Creates individual DevLake projects for each repository
5. **📅 Time Management**: Updates blueprint `timeAfter` values to previous Saturday

### 2. Monitoring Process (Continuous Daemon)  
The `blueprint_monitor.py` daemon runs continuously:

1. **👁️ Status Monitoring**: Checks blueprint pipeline status every 5 minutes
2. **❌ Failure Detection**: Identifies failed data collection jobs
3. **📊 Metrics Creation**: Updates Prometheus metrics for failures
4. **🔄 Continuous Operation**: Runs forever as a monitoring daemon

## 🏗️ Architecture

```
┌─────────────────────┐    ┌─────────────────────┐
│   manage_projects   │    │  blueprint_monitor  │
│   (Daily Daemon)    │    │ (Continuous Daemon) │
└──────────┬──────────┘    └──────────┬──────────┘
           │                          │
           ▼                          ▼
┌─────────────────────────────────────────────────┐
│              Core Modules                       │
├─────────────────────────────────────────────────┤
│ • orchestrator.py  - Workflow orchestration    │
│ • api.py          - DevLake API client         │
│ • projects.py     - Project/blueprint creation │
│ • connection.py   - Connection management      │
│ • scopes.py       - Repository scope handling  │
│ • monitoring.py   - Prometheus metrics         │
└─────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────┐
│                DevLake API                      │
│        (Projects, Blueprints, Pipelines)       │
└─────────────────────────────────────────────────┘
```

## 📊 Monitoring & Metrics

### Prometheus Metrics Server
- **Endpoint**: `http://localhost:9100/metrics`
- **Metrics**: Custom DevLake blueprint failure counters
- **Labels**: `project_name`, `time_failed`

### Example Metrics Output
```prometheus
# HELP devlake_blueprint_failure_total Count of failed blueprint executions
# TYPE devlake_blueprint_failure_total counter
devlake_blueprint_failure_total{project_name="github/my-repo",time_failed="2025-08-08 14:06:06"} 1.0
```

### Health Checks
```bash
# Check monitoring daemon status
curl http://localhost:9100/metrics | grep devlake_blueprint

# View container logs
docker logs devlake-automation

# Check running processes
docker exec devlake-automation ps aux
```

## 🔍 Code Structure

### Entry Points
- **`manage_projects.py`**: Daily automation daemon (6PM Vietnam time)
- **`blueprint_monitor.py`**: Continuous monitoring daemon
- **`run_monitoring.py`**: Standalone monitoring script

### Core Modules (`modules/`)
- **`orchestrator.py`**: Main workflow orchestration and plugin processing
- **`api.py`**: DevLake REST API client with error handling
- **`projects.py`**: Project and blueprint creation logic
- **`connection.py`**: Connection management and scope configuration
- **`scopes.py`**: Repository scope management and remote synchronization
- **`monitoring.py`**: Blueprint monitoring with Prometheus metrics integration

### Utilities (`utils/`)
- **`http.py`**: HTTP client with retry mechanisms and response validation
- **`logging.py`**: Structured logging configuration with timezone support
- **`datetime.py`**: Date/time utilities and timezone handling
- **`blueprints.py`**: Blueprint time management and Saturday calculations

### Configuration
- **`config.py`**: Centralized environment variable configuration management

## 🐳 Docker Features

- **Multi-stage Build**: Optimized image size with builder pattern
- **Non-root User**: Runs with restricted permissions for security
- **Background Processes**: Both daemons run simultaneously in container
- **Health Monitoring**: Prometheus metrics endpoint exposed on port 9100
- **Environment Configuration**: All settings via environment variables

## 🔄 Supported Platforms

### Source Code Management
- **GitHub**: Public and private repositories
- **GitLab**: Self-hosted and cloud instances  
- **Bitbucket**: Cloud and server versions
- **Azure DevOps**: Git repositories

### CI/CD Systems
- **Jenkins**: Job and build monitoring
- **CircleCI**: Pipeline execution tracking
- **Bamboo**: Build plan monitoring

### Issue Tracking
- **Jira**: Issue and project synchronization

## ⚡ Performance Features

- **Smart Repository Sync**: Only syncs new repositories, skips existing ones
- **Batch Processing**: Processes multiple repositories efficiently
- **Rate Limiting**: Respects API limits with automatic delays
- **Memory Efficient**: Streams large datasets without loading everything in memory
- **Failure Resilience**: Continues processing even if individual repositories fail

## 🚨 Error Handling

- **Graceful Failures**: Individual repository failures don't stop the entire process
- **Retry Mechanisms**: Automatic retries with exponential backoff
- **Comprehensive Logging**: Detailed logs for troubleshooting
- **API Error Handling**: Proper HTTP status code and response validation
- **Prometheus Metrics**: Failure tracking via metrics instead of noisy alerts

## 📝 Development

### Running Tests
```bash
# Install development dependencies
pip install -r requirements.txt

# Run individual components
python -m modules.orchestrator  # Test orchestration logic
python -m utils.logging        # Test logging configuration
```

### Adding New Plugins
1. Add plugin support in `modules/scopes.py`
2. Update repository ID extraction logic
3. Add plugin-specific configuration in `config.py`
4. Test with your DevLake instance

## 🔧 Troubleshooting

### Common Issues

**API Connection Errors**
```bash
# Check DevLake instance accessibility
curl http://your-devlake-instance:8080/plugins

# Verify container network connectivity
docker exec devlake-automation curl http://host.docker.internal:8080/plugins
```

**Missing Metrics**
```bash
# Check Prometheus server
curl http://localhost:9100/metrics

# Verify monitoring daemon is running
docker exec devlake-automation ps aux | grep blueprint_monitor
```

**Permission Errors**
```bash
# Check container user permissions
docker exec devlake-automation id

# Verify file ownership
docker exec devlake-automation ls -la /app
```

## 📄 License

This project is part of the DevLake automation suite for enterprise data collection and monitoring.
