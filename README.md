# Polycons!

Polycons ("polymorphic constructs").

Consider this the L4 Construct

## Mark's Notes

Current attempts are trying to keep the "constructor pattern" that all CDKs do. This is difficult, as `new Whatever()` doesn't make sense when `Whatever` doesn't have a default concrete class.

Not being able to use generics is pretty terrible.
Do we need to introduce the concept of construct subtrees? If so we could probably handle multiple factories in the same tree (of trees)
Should you be able to use "raw"/"concrete" constructs without going through the factory at all?


---

Function
Serverless code execution

Bucket
Storage of files/folders

Queue

Topic
pubsub system

Schedule
CRON system

Output

Secret

Document
Key/value storage
