---
title: Prepare for system design interviews.
date: 2021-02-11
tags: ["interview", "system-design"]
excerpt: Many people are afraid of system design interviews as there's normally no certain pattern to prepare for and the question is open-ended, unpredictable, and quite flexible. Therefore, there's usually no standard or correct answer which makes the preparation process even harder. This blog will cover how you prepare for system design interviews and what interviewers expect from you.
published: false
---

Many people are afraid of system design interviews as there's normally no certain pattern to prepare for and the question is open-ended, unpredictable, and quite flexible. Therefore, there's usually no standard or correct answer which makes the preparation process even harder.

I'll cover some tips that would help you to prepare and potentially impress your interviewers.

#### Clarify questions

Usually, the question is given without detailed information. This is intended in order to test the ability to work with ambiguity. You should ask for further clarifications to avoid solving a wrong problem. It's OK to give an common-sense assumption; however make sure to inform the interviewer that you're giving an assumption in order to solve the problem.

#### Give an outline

Like writing engineering specifications, I find it useful to have an outline of the design. Not only does it help you to structure your thought, but it also helps to align with the expectation from the interviewer. I usually recommend this below structure:
- High-level architecture
- Data model
- Choice of techniques & trade-offs
- Scalability concerns
- Availability concerns
- Security concerns

Starting with high-level architecture will give an overview of your design. It then will allow the interview to follow your idea easier. Choice of technologies & trade-offs is the place to show your experience and your knowledge of different types of technologies. Security concerns is not less important at all especially when people are more concerned about their data. Any hack/breach will not only be costly in terms of economic but also reputation.

If you have extra time, it's also good to talk about:
- Fault tolerance
- Deployment
- Rollout
- Configurations

#### Start with a simple solution

In my experience, lots of candidates start with a sophisticated solution which ended up confusing themselves. They usually struggled to implement it let alone to explain the solution to the interviewer. Therefore, I keep always remind my candidates to start with a simple approach first and then expand to solve a complex problem. This approach is actually practical when we start with MVP and then adding more functionalities later.

Just to be clear, I don't suggest proposing a simple solution only as the world problem is usually more complicated due to business constraints. However, evolving from a simple solution to complex one demonstrate critical thinking skill much better. 

#### Give reasons always

One mistake that I usually see from candidates is to give a technical choice without giving any specific reason. An example is that one adds a cache and saying that it's used for caching data without considering whether there is a performance benefit. This won't help the interviewer to address your experience or knowledge on the given stack. Instead, it may create a bad impression that you're naming the stack and just copying the answer.

#### Consider trade-off

Selecting the right stack or architecture is good but it's always better if you can provide the comparison with any alternative solution and explaining the trade-off. I believe this should show off your experience and deep understanding of the stack. As a result, it can increase your score significantly. For example, instead of just saying that using a queue for an asynchronous job, you can compare it with a synchronous solution and share the compromise that has to be made.

Those are some tips that I find useful. Of course, it's important to have a wide range of knowledge about different types of technology stacks. Having research about the company is also good to understand the tech-stack and so you can learn about it in advance. Good luck with your interview!
