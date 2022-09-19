<template>
	<section>
		<template
			v-if="Object.prototype.toString.call(errors) === '[object Array]'"
		>
			<div v-for="(value, key) in errors" :key="key">
				<client-only>
					<b-alert
						variant="danger"
						show
						dismissible
						v-for="(error, i) in value"
						:key="i"
					>
						<div v-html="error"></div>
					</b-alert>
				</client-only>
			</div>
		</template>
		<template
			v-if="Object.prototype.toString.call(errors) === '[object Object]'"
		>
			<div v-for="(value, key) in errors" :key="key">
				<client-only>
					<b-alert
						variant="danger"
						show
						dismissible
						v-for="(error, i) in value"
						:key="i"
					>
						<div v-html="error"></div>
					</b-alert>
				</client-only>
			</div>
		</template>
		<template
			v-if="Object.prototype.toString.call(errors) === '[object String]'"
		>
			<div>
				<client-only>
					<b-alert variant="danger" show dismissible>
						<div v-html="errors"></div>
					</b-alert>
				</client-only>
			</div>
		</template>
		<!-- <div>
			{{ errors }}
		</div> -->
	</section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		errors: {
			type: [Array, Object, String],
			required: true,
		},
	},
});
</script>

<style scoped></style>
