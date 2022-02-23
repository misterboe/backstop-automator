# Backstop Automator

## How to run?

Use node >= node 14

Install dependencies
```bash
npm i
```

Link Global
```bash
npm link
```

Create references:
```bash
autoback --run=reference --projectname=projectname --url=https://projectname.local/ --reference=https://projectname.de/
```

Run test:
```bash
autoback --run=test --projectname=projectname --url=https://projectname.local/ --reference=https://projectname.de/
```

Approve test
```bash
autoback --run=approve --projectname=projectname --url=https://projectname.local/ --reference=https://projectname.de/
```

openReport
```bash
autoback --run=openReport --projectname=projectname --url=https://projectname.local/ --reference=https://projectname.de/
```
