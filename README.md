# claude-slack 


Setup the claude-slack bot and to your slack workspace.


## Prerequisites
- nodejs
- google chrome - Slack running on web 

## Installation

```bash
npm install -g puppeteer
npm install -g html-to-text
```

## Usage
1. Start chrome with remote debugging port
```bash
chrome --remote-debugging-port=9999
```
2. Open https://workspace.slack.com/ and login

3. Run the script to start chatting, you can add aias in your .bashrc or .zshrc
```bash
node calude.js <Query>
```
### Editor integration
You can any kind of editor to run command to get output back. here just use Emacs for demo 
```emacs-lisp
(defun query-gpt-chat()
  "Run script command with current line content and insert output in buffer"
  (interactive)
  (let ((current-line (thing-at-point 'line t))
        (output (shell-command-to-string (concat "claude" (thing-at-point 'line t)))))
    (insert (mapconcat 'identity (nthcdr 4 (split-string output "\n")) "\n"))))

(global-set-key (kbd "C-;") 'query-gpt-chat)
```
which ngpt just a alias to command `node claude.js`

