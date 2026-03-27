---
title: Guardrails for Coding Agents
date: 2026-03-27
description: Autonomous coding agents are fast and capable, but they need a feedback loop to stay reliable. Learn how automated quality checks, tests, and hooks help coding agents self-correct and let you focus on what matters.
tags: ["ai", "testing", "java", "software-engineering"]
---

## Introduction

Autonomous coding agents are becoming part of everyday development. Tools like RovoDev, Claude Code, OpenAI Codex, and GitHub Copilot CLI can write, refactor, and debug code with minimal input. They are fast, tireless, and increasingly capable.

But speed without feedback is just fast failure. You can give an agent guidelines, a system prompt, and all the context it needs. The problem is that agents do not always follow the rules, and on longer or more complex tasks they can lose track of earlier instructions. A convention gets ignored, a layer boundary gets crossed, a test gets skipped. The agent moves on confidently, unaware that something quietly broke.

The solution is to build a feedback loop where automated tools catch problems early and let the agent self-correct. Your role shifts from line-by-line reviewer to designer of guardrails.

## Code Quality Checks

Code quality checks are deterministic and near-instant. They scale without any extra effort once they are set up.

### Formatting

Formatters like Google Java Format or Spotless eliminate style noise entirely. When an agent generates code, it should not make decisions about indentation or line breaks. A formatter makes those decisions consistently.

```xml
<plugin>
    <groupId>com.diffplug.spotless</groupId>
    <artifactId>spotless-maven-plugin</artifactId>
    <version>2.44.3</version>
    <configuration>
        <java>
            <googleJavaFormat/>
        </java>
    </configuration>
</plugin>
```

Running `mvn spotless:apply` after generation means formatting is never a review concern.

### Linting and Static Analysis

Static analysis tools like Checkstyle, PMD, or SpotBugs catch bad patterns that a formatter cannot. Unused imports, overly complex methods, null dereference risks—these are exactly the kinds of mistakes that agents make when they generate boilerplate or copy patterns without full context.

```xml
<plugin>
    <groupId>com.github.spotbugs</groupId>
    <artifactId>spotbugs-maven-plugin</artifactId>
    <version>4.9.3</version>
</plugin>
```

Running `mvn spotbugs:check` gives the agent a concrete, actionable list of problems to fix.

### Architectural Rules

An agent can easily violate layering rules: putting business logic in a controller, importing infrastructure classes into the domain, or reaching across module boundaries. These violations are invisible to a formatter and often pass static analysis, but they accumulate into structural debt that is painful to undo.

ArchUnit lets you encode architectural rules as tests, so they are verified on every build. For example, to prevent domain classes from depending on infrastructure:

```java
@Test
public void domain_should_not_depend_on_infrastructure() {
    noClasses().that().resideInAPackage("..domain..")
            .should().dependOnClassesThat().resideInAPackage("..infrastructure..")
            .because("domain layer must remain independent of infrastructure concerns")
            .check(classes);
}
```

When an agent crosses that boundary, the test fails immediately with a clear message. The agent can read the failure and correct the import without any human involvement.

## Testing

Quality checks verify structure and style. Tests verify behaviour.

### Unit Tests

Unit tests are the agent's tightest feedback loop. They are fast, isolated, and directly tied to the logic just written. Agents work well in a loop: write code, run tests, read failures, correct code, repeat. This only works if the test suite is fast and focused.

### Integration and End-to-End Tests

Integration and end-to-end tests catch a different class of mistake. An agent can write a method that works correctly in isolation but misuses a dependency, sends the wrong payload to a downstream service, or misreads a database result. Unit tests will not catch this. These broader tests will.

They are slower, so they belong later in the loop rather than in the tightest iteration cycle. But they are important precisely because agents tend to make confident assumptions about how components interact. Think of them as a safety net for the things that unit tests missed.

## Hooks: Making Validation Non-Negotiable

Hooks automate enforcement so that neither you nor the agent has to remember to run checks manually.

### Git Hooks

A pre-commit hook runs before every commit. This is the right place for fast checks: formatting, linting, compilation. If the hook fails, the commit is blocked.

A simple pre-commit hook for a Maven project:

```bash
#!/bin/sh
mvn spotless:check checkstyle:check --no-transfer-progress -q
if [ $? -ne 0 ]; then
  echo "Quality checks failed. Please fix the issues before committing."
  exit 1
fi
```

Tools like [pre-commit](https://pre-commit.com/) make managing these hooks across a team much easier. Agents can also run these checks themselves before committing, treating the output as feedback to act on.

You can also include unit tests in the pre-commit hook for an extra layer of confidence. The trade-off is speed: every commit takes longer, and a slow hook is one that developers (and agents) are tempted to skip with `--no-verify`. Keep it fast or be selective about which tests run at this stage.

### CI Pipelines

CI is the full suite: unit tests, integration tests, static analysis, architectural rules, and anything too slow for a pre-commit hook. It runs on every push, automatically.

Even if a commit sneaks through a misconfigured local hook, CI catches it. Pre-commit hooks handle speed, CI handles completeness.

## The Feedback Loop in Practice

With these guardrails in place, a typical session looks like this:

1. You define the requirements and the agent writes tests for them first. The tests fail, as expected, giving the agent a clear target before any implementation begins.
2. The agent writes the implementation until the tests pass. A failing test points to a logic error the agent can trace and fix before moving on.
3. The agent runs integration tests to verify that the new code works correctly with its dependencies. Failures here often reveal wrong assumptions about how components interact.
4. The pre-commit hook runs formatting and linting. If something fails, the agent reads the output and fixes it before the commit lands.
5. CI runs on the pushed branch. The full test suite and architectural checks run automatically. Any remaining issues surface here and the agent addresses them from the pipeline output.
6. You review the result for intent and business logic, not formatting, not style, not obvious bugs. Those have already been handled.

The guardrails do not make the agent smarter. They make the agent's mistakes visible and correctable before they reach you.

## Conclusion

The value of coding agents depends entirely on how quickly and reliably they can self-correct. A well-set-up feedback loop—quality checks, tests, hooks, and CI—turns a fast-but-unpredictable agent into a fast-and-trustworthy one.

The investment in setting this up pays compound interest. Every rule you encode, every test you write, every hook you configure works for every session that follows. The better your guardrails, the more confidently you can delegate.

## References

* [Spotless Maven Plugin](https://github.com/diffplug/spotless/tree/main/plugin-maven)
* [SpotBugs Maven Plugin](https://spotbugs.github.io/spotbugs-maven-plugin/)
* [ArchUnit Getting Started](https://www.archunit.org/getting-started)
* [pre-commit](https://pre-commit.com/)

---

_This post was written with AI assistance. The ideas and opinions are my own._
