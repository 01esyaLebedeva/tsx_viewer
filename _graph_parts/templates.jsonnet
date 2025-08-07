// _graph_parts/templates.jsonnet
// This part defines reusable templates for creating entities.

{
    Metadata(confidence, author, notes = '') = {
      confidence: confidence,
      author: author,
      timestamp: std.extVar('timestamp'),
      notes: notes,
    },

    Component(name, path, purpose, props=[], state=[], dependencies=[], interactions=[], metadata) = {
      type: 'ReactComponent',
      name: name,
      path: path,
      purpose: purpose,
      props: props,
      state: state,
      dependencies: dependencies,
      interactions: interactions,
      metadata: metadata,
    },

    IpcChannel(direction, purpose, payload={}, metadata) = {
      type: 'IPCChannel',
      direction: direction,
      purpose: purpose,
      payload: payload,
      metadata: metadata,
    },
}