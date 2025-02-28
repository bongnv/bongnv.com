---
title: Coding Convention as Code with ArchUnit
date: 2025-02-28
description: Explore how to automate coding conventions using ArchUnit in Java projects. This blog explains how to set up ArchUnit, define architectural rules, and overcome common challenges, ensuring a cleaner, more consistent codebase.
---
## Why Conventions Matter

In software development, coding conventions ensure that the code remains clean, consistent, and easy to understand. They guide how to name files, format code, and structure projects so that teams can collaborate smoothly.

Traditionally, these conventions are shared as documents or style guides. This means that developers must remember the rules, while reviewers must catch any mistakes during code reviews—a manual process that can be slow, inconsistent, and prone to errors, especially as the codebase grows.

This blog explores how to make coding conventions an integral part of the source code. With tools like ArchUnit, it becomes possible to automatically verify that a Java project follows the agreed rules. This approach not only saves time but also maintains high code quality without relying solely on manual review.

## Coding Convention as Code

Coding Convention as Code transforms traditional style guidelines into automated checks. Instead of relying on documents and manual reviews, rules are defined directly in code—ensuring that they are continuously enforced as the project evolves.

By integrating these checks into the development process with tools like ArchUnit, instant feedback is provided when something doesn't match the agreed standards. For example, a test can immediately flag when Logger fields are not declared as private, static, and final.

This approach not only saves time but also reduces the risk of human error. It enables teams to focus on building features, while the code itself enforces architectural rules. Every build or test run verifies these rules, ensuring that coding conventions remain consistent throughout the project.

## Using ArchUnit

For Java projects, ArchUnit proves to be a practical tool for automatically enforcing coding rules. The following outlines the steps to set it up and define 

### Setting Up ArchUnit

* Add the Dependency: If you’re using Maven, add this to your pom.xml:

```xml
<dependency>
    <groupId>com.tngtech.archunit</groupId>
    <artifactId>archunit</artifactId>
    <version>1.4.0</version>
    <scope>test</scope>
</dependency>
```

* Create a Test Class: Create a test class where your architectural rules will live:
```java
public class CodingRulesTest {

    private final JavaClasses classes = new ClassFileImporter().importPackages("com.myapp");
}
```
This test class executes ArchUnit rules by scanning the code, ensuring that rules are automatically applied during each build.

### Defining Rules

With ArchUnit, rules can be written to ensure that the code follows specific conventions. For instance, to enforce that Logger fields are declared as private, static, and final, the following rule may be written:
```java
    @Test
    public void loggers_should_be_private_static_final() {
        fields().that().haveRawType(Logger.class)
                .should().bePrivate()
                .andShould().beStatic()
                .andShould().beFinal()
                .because("the convention has been agreed upon")
                .check(classes);
    }
```

The above example serves as a self-descriptive convention for Logger that can also act as documentation. Similar rules can be created for naming, package structure, and other aspects of the code.

ArchUnit is flexible. In addition to the built-in rules, custom rules can be created to match a project’s specific needs.

By turning coding conventions into code with ArchUnit, rules are always verified—reducing the risk of mistakes and keeping the codebase consistent.

## Challenges

Adopting a code-based approach to enforce coding conventions can be highly effective, but it comes with its own set of challenges. Here are a couple of key areas to keep in mind:

### Initial Setup and Learning Curve

* **Setup Time**: Integrating ArchUnit requires adding dependencies and configuring test classes. This initial setup may slow development at first.
* **Learning Curve**: Writing ArchUnit rules may be new for some developers. It can take time to become comfortable with the syntax and best practices.
* **Static Analysis Limitations**: ArchUnit performs static analysis, meaning it only inspects the code at compile time. It is unable to capture dynamic behavior or runtime conditions, so certain runtime-generated scenarios may not be fully enforced by the rules.

Starting with a few simple rules and gradually expanding them as the team gains confidence can mitigate these challenges.

### Balancing Flexibility and Strictness

* **Avoiding Over-Enforcement**: Too many strict rules might slow down the development process or limit creative problem-solving. On the flip side, overly flexible rules can allow violations to slip through.
* **Regular Review**: It's important to periodically reassess the rules. Adjusting them based on feedback and project needs ensures they remain effective without becoming burdensome.

By carefully balancing enforcement, high code quality can be maintained while keeping the development process flexible.

## Conclusion

Using ArchUnit to enforce coding conventions as code offers many benefits. It automates rule enforcement, reduces errors, and keeps Java projects consistent and maintainable. Although there are challenges such as setup time, a learning curve, and static analysis limits, these can be managed with gradual adoption. This approach allows more focus on building features and less on manual reviews.

## References

* [ArchUnit Getting Started](https://www.archunit.org/getting-started)
* [ArchUnit User Guide](https://www.archunit.org/userguide/html/000_Index.html)
* [ArchUnit Examples](https://github.com/TNG/ArchUnit-Examples)
