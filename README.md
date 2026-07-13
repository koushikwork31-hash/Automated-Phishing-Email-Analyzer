# ThePhish
## An Automated Phishing Email Analysis Tool

<div align="center">
  <img src="pictures/logo.png" alt="ThePhish Logo" width="800"> 
  <br><br>
</div>

---

## Overview

ThePhish is an open-source, automated phishing email analysis tool that integrates with **TheHive** (case management), **Cortex** (analyzers & responders), and **MISP** (threat intelligence platform). It streamlines the entire process of analyzing suspicious emails—from extracting observables to delivering a final verdict.

## Key Features (Enhanced)
- **Automated Email Fetching**: Pulls unread emails from an IMAP server
- **Observable Extraction**: Extracts URLs, domains, IPs, email addresses, attachments, hashes, etc., using [ioc-finder](https://github.com/fhightower/ioc-finder)
- **Whitelist Support**: Prevents false positives by skipping known-safe observables
- **Cortex Analyzers**: Runs a comprehensive suite of analyzers on observables
- **Verdict Calculation**: Provides a verdict of *Malicious*, *Suspicious*, or *Safe*
- **MISP Integration**: Automatically exports malicious cases to MISP for threat intelligence sharing
- **Mailer Responder**: Notifies users via email when analysis starts and finishes
- **Web Interface**: Modern, user-friendly UI to monitor and control analysis
- **Docker Support**: Easy deployment via Docker Compose

---

## Prerequisites
- Python 3.8+
- TheHive 3.5.x (configured and running)
- Cortex 3.1.x (configured and running with enabled analyzers/responders)
- MISP (optional but recommended, for threat intel sharing)
- An email account with IMAP access (Gmail recommended)

---

## Quick Start with Docker Compose
We provide a Docker Compose template for getting up and running quickly!

```bash
# Clone this repo
git clone https://github.com/[YOUR-GITHUB-USERNAME]/ThePhish.git
cd ThePhish

# Navigate to docker directory and start services
cd docker
docker-compose up -d
```

For detailed configuration steps, see [Docker Installation Guide](docker/README.md).

---

## Installation from Scratch
1.  **Set up TheHive, Cortex, and MISP** (follow their respective official docs)
2.  **Clone this repo**
    ```bash
    git clone https://github.com/[YOUR-GITHUB-USERNAME]/ThePhish.git
    cd ThePhish/app
    ```
3.  **Create and activate a virtual environment**
    ```bash
    python -m venv venv
    # Linux/macOS: source venv/bin/activate
    # Windows: venv\Scripts\activate
    ```
4.  **Install the dependencies**
    ```bash
    pip install -r requirements.txt
    ```
5.  **Configure ThePhish**
    -   Edit `app/configuration.json` with your IMAP credentials, TheHive and Cortex API keys
    -   Update `app/whitelist.json` to exclude your organization's domains/IPs
6.  **Run the app**
    ```bash
    python thephish_app.py
    ```
The app should now be running at http://localhost:8080!

---

## Analyzers Configuration
ThePhish works with Cortex analyzers. See the [main documentation](app/analyzers_level_conf.json) for how to configure analyzer levels.

### Recommended Analyzers
Here are some recommended Cortex analyzers to get the most out of ThePhish:
- AbuseIPDB
- Any.Run Sandbox
- DomainMailSPFDMARC_Analyzer
- FileInfo
- Malwares_GetReport
- MISP_2_1
- PassiveTotal Enrichment
- PhishTank CheckURL
- Shodan Host
- URLhaus
- VirusTotal GetReport
- Yara_2_0

---

## Usage
1.  **Users forward suspicious emails** to your designated ThePhish email address as **.eml attachments**
2.  **Analyst clicks "List emails"** in the web interface
3.  **Analyst selects an email** and clicks "Analyze"
4.  **ThePhish takes over**:
    -   Creates a case on TheHive
    -   Adds observables
    -   Starts Cortex analyzers
    -   Calculates a verdict
    -   If malicious: closes case and exports to MISP
    -   Sends email notifications to the user

---

## New Cybersecurity Concepts Added!
To enhance ThePhish's capabilities, we've added focus on:
1.  **MITRE ATT&CK Framework Integration (Conceptual)**: While ThePhish doesn't natively map to ATT&CK yet, the architecture allows you to tag observables with MITRE ATT&CK tactics/techniques (e.g., "Initial Access: Spearphishing Attachment")
2.  **Improved Threat Intelligence Sharing**: Enhanced MISP integration with better tagging and export options
3.  **Enhanced Whitelist**: Supports exact matching, regex, and domain-in-subdomain checks to minimize false positives
4.  **Comprehensive Observables**: Extracts all relevant IOCs (Indicators of Compromise) for full coverage

---

## License
This project is licensed under the **GNU Affero General Public License v3.0** - see [LICENSE](LICENSE) file for details.

---

## Author
[Patnam Koushik]

---

