<script setup>
import { BubbleMenu, Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

import Youtube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";

const isFullScreen = ref(false);

const props = defineProps({
  placeholder: {
    type: String,
    default: "Write something …",
  },
  content: {
    type: String,
    default: "",
  },
  photo: {
    type: Object,
    default: () => ({}),
  },
  limit: {
    type: Number,
    default: 0,
  },
  error: {
    type: String,
    default: "",
  }
});

const emit = defineEmits(["valueModel"]);

// const isShowColors = ref(false);

const editor = new Editor({
  content: props.content,

  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    Image.configure({
      inline: true,
      HTMLAttributes: {
        class: "w-full mx-auto xl:w-250 flex justify-center items-center",
      },
    }),
    Highlight.configure({ multicolor: true }),
    TextStyle,
    Color.configure({
      types: ["textStyle"],
    }),
    Youtube.configure({
      controls: true,
      HTMLAttributes: {
        class:
          "w-full h-full aspect-video mx-auto flex justify-center items-center",
      },
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    CharacterCount.configure({
      limit: props.limit,
    }),
    TaskList.configure({
      HtmlAttributes: {
        class: "flex items-start my-4",
      },
      nested: true,
    }),
    TaskItem.configure({
      HTMLAttributes: {
        class: "not-prose",
      },
    }),
  ],
  editorProps: {
    attributes: {
      class:
        " w-full h-full props dark:props-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none  overscroll-contain overflow-y-hidden hover:overflow-y-auto overflow-x-hidden scrollbar scrollbar-left scrollbar-blue-600 scrollbar-rounded scrollbar-w-3px scrollbar-radius-2 scrollbar-track-radius-2 scrollbar-thumb-radius-2",
    },
  },
  autofocus: true,
  editable: true,
  onUpdate: ({ editor }) => {
    emit("valueModel", editor.getHTML());
  },
});

// const isShowError = ref(false);
// editor.commands.setColor('#fff')

watch(
  () => props.photo,
  (photo) => {
    if (photo.previewUrl) {
      editor
        .chain()
        .focus()
        .setImage({
          src: photo.previewUrl,
          alt: photo.name ? photo.name : photo.previewUrl,
          title: photo.name,
        })
        .run();
    }
  }
);

// watch(() => props.title, (title) => {
//     if(title) {
//         editor.commands.insertContent({
//             type: 'heading',
//             attrs: {
//                 level: 1,
//             },
//             content: [
//                 {
//                     type: 'text',
//                     text: title,
//                 },
//             ],
//         })
//     }
// })

function addVideo() {
  const url = prompt("Enter YouTube URL");

  editor.commands.setYoutubeVideo({
    src: url,
  });
}

onMounted(() => {
  if (props.content) {
    editor.content = props.content;
  }
});

onBeforeUnmount(() => {
  editor?.destroy();
});
</script>

<template>
  <ClientOnly>
    <div
      v-if="editor"
      class="w-full border-solid rounded-xl border-slate-600 px-1 lg:px-4 xl:px-5 flex flex-col justify-start items-start box-border"
      :class="[
        isFullScreen
          ? 'w-screen h-screen fixed top-0 left-0 z-100 dark:bg-background-dark bg-background-light'
          : 'w-full h-full relative',
      ]"
    >
      <div
        class="absolute top-0 w-full h-9 z-10 flex justify-end p-2 space-x-2"
        :class="[isFullScreen ? 'right-10' : 'right-0']"
      >
        <span
          class="absolute top-0 left-0 w-full flex justify-center items-center transition-all duration-300 bg-error-900 text-error-300 py-1 box-border rounded-t-xl"
          v-if="error"
        >
          {{ error }}
        </span>

        <x-btn
          class="group bg-slate-800/90 text-white group-hover:bg-slate-700/90 transition duration-150 ease-out"
          icon
          rounded
          shadow
          type="button"
          :tooltip="{ text: 'Add YouTube video' }"
          @click="addVideo()"
        >
          <Icon
            name="logos:youtube-icon"
            class="text-xl text-slate-600 group-hover:text-slate-400"
          />
        </x-btn>

        <x-btn
          class="group bg-slate-800/90 text-white group-hover:bg-slate-700/90 transition duration-150 ease-out"
          icon
          rounded
          shadow
          type="button"
          :tooltip="{
            text: !isFullScreen ? 'Full Screen' : 'Exit Full Screen',
          }"
          @click="isFullScreen = !isFullScreen"
        >
          <Icon
            :name="
              isFullScreen
                ? 'material-symbols:fullscreen-exit'
                : 'material-symbols:fullscreen'
            "
            class="text-xl text-slate-600 group-hover:text-slate-400"
          />
        </x-btn>
      </div>

      <bubble-menu
        v-if="editor"
        class="w-full md:w-150 flex justify-center items-center border-solid border-1 border-slate-700 bg-slate-800 rounded-xl"
        :editor="editor"
        :tippy-options="{ duration: 100 }"
      >
        <x-text-editor-menu-bar
          class="grid grid-cols-6 md:grid-cols-12 gap-1 z-60"
          :editor="editor"
        />
      </bubble-menu>

      <editor-content
        class="w-full pt-4 box-border"
        :class="[
          isFullScreen ? 'w-full h-full container mx-auto' : 'min-h-150',
        ]"
        :editor="editor"
      />

      <div v-if="editor" class="w-full px-3 box-border">
        <span
          v-if="limit"
          class="w-full flex justify-end text-sm"
          :class="[
            editor.storage.characterCount.characters() == limit
              ? 'text-red-500'
              : 'text-muted dark:text-muted-dark',
          ]"
        >
          {{ editor.storage.characterCount.characters() }}/{{ limit }}
        </span>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss">
/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0;
  }
  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  iframe {
    border: 8px solid #000;
    border-radius: 4px;
    min-width: 200px;
    min-height: 200px;
    display: block;
    outline: 0px solid transparent;
  }

  div[data-youtube-video] {
    cursor: move;
    padding-right: 24px;
  }

  .ProseMirror-selectednode iframe {
    transition: outline 0.15s;
    outline: 6px solid #ece111;
  }
}

/* Placeholder (at the top) */
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

/* Placeholder (on every new line) */
.tiptap p.is-empty::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

img {
  max-width: 100%;
  height: auto;

  &.ProseMirror-selectednode {
    outline: 3px solid #68cef8;
  }
}
</style>
